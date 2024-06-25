import axios from "axios";
import {toast} from "react-toastify";
import { setAuthToken } from "../helpers/tokens";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const errorHandler = (error) => {
	if(error?.response?.status && 
		error?.response?.status !== 403 &&
		error?.response?.status !== 404
	){
		toast.error(`${error?.response?.data?.message || 'Возникла ошибка'}`);  
	}if(error?.response?.status == 401){
		localStorage.removeItem('token')
	}

  return Promise.reject({ ...error })
}

instance.interceptors.response.use(
  (response) => {return response},
  (error) => errorHandler(error),
);


function getAccessToken() {
	return localStorage.getItem('token');
}

instance.interceptors.request.use((request) => {
	if (!request.headers['Authorization'] && getAccessToken()){
		request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
	}
	return request;
});

export const auth = {
	loginTelegram(user) {
		const data = {
			"telegramId": user?.id,
			"firstName": user?.first_name,
			"lastName": user?.last_name,
			"username": user?.username,
			"photoUrl": user?.photo_url,
			"authDate": user?.auth_date,
			"hash": user?.hash
		}

		return instance.post("/login/telegram", data).then(response => {
				setAuthToken(response.data.accessToken);
				localStorage.setItem('token', response.data.accessToken)
				window.location.href = '/'
			}).catch(err => {
				console.log(err);
			})
	},
	loginEmail(data) {
		return instance.post("/login/email", data).then(response => {
				setAuthToken(response.data.accessToken);
				localStorage.setItem('token', response.data.accessToken)

				const pendingCartUpdate = localStorage.getItem('cart');
				if (pendingCartUpdate) {
					const cartData = JSON.parse(pendingCartUpdate);
					profile.updateCart(cartData.map(el => ({format: el.format, channelId: el.id, count: el.count})))
						.then(() => {
							localStorage.removeItem('cart');
						})
						.catch((error) => {
							console.error('Ошибка при отправке данных корзины на сервер:', error);
						});
				}
				
				window.location.href = '/'
			})
	},
	emailConfirm(data) {
		return instance.post("/users/confirm/email", data)
	},
	restorePassword(data){
		return instance.post("/users/password/restore", data)
	},
	updatePassword(data){
		return instance.put("/users/current/password", {password: data.password}, {
			headers: {
				Authorization: `Bearer ${data.token || localStorage.getItem('token')}`
			}
		})
	},
	registrationEmail(data) {
		return instance.post("/users/registration/by_email", data)
	},
	registrationTelegram(user) {
		const data = {
			"telegramId": user?.id,
			"firstName": user?.first_name,
			"lastName": user?.last_name,
			"username": user?.username,
			"photoUrl": user?.photo_url,
			"authDate": user?.auth_date,
			"hash": user?.hash,
			"role": user?.role
		}
		return instance.post("/users/registration/by_telegram", data)
	},
	logout() {
		setAuthToken();
		localStorage.removeItem('token')
		window.location.href = '/'
	}
}

export const profile = {
	me() {
		return instance.get("/users/current")
	},
	getCart() {
		return instance.get("/users/current/cart")
	},
	updateCart(data) {
		return instance.put("/users/current/cart", data)
	},
	updateProfile(data) {
		return instance.put("/users/current", data)
	},
	connectTelegram(user) {
		const data = {
			"telegramId": user?.id,
			"firstName": user?.first_name,
			"lastName": user?.last_name,
			"username": user?.username,
			"photoUrl": user?.photo_url,
			"authDate": user?.auth_date,
			"hash": user?.hash
		}

		return instance.post("/users/current/connect/telegram", data)
	},
	connectEmail(data) {
		return instance.post("/users/current/connect/email", data)
	},
	getBalanceOperations(params) {
		return instance.get("/balance_operations/my", {params, paramsSerializer: {
			indexes: null
		}}).then(res => {
			return res
		})
	},
	withdrawalBalance(data) {
		return instance.post("/balance_operations/withdrawal", data)
	}
}

export const publisher = {
	getChannels(params) {
		return instance.get("/channels/my", params)
	},
	getChannelByID(id) {
		return instance.get(`/channels/${id}`)
	},
	createChannel(data) {
		return instance.post("/channels/my", data)
	},
	confirmChannel(id) {
		return instance.post(`/channels/${id}/confirm`)
	},
	updateChannel({data, id}) {
		return instance.put("/channels/" + id + '/prices', data)
	},
	removeChannel(id) {
		return instance.delete("/channels/" + id)
	},
	getSelfEmployed() {
		return instance.get(`/users/current/self_employed/`)
	},
	updateSelfEmployed(data) {
		return instance.put(`/users/current/self_employed/`, data)
	},
	getLegalEntity() {
		return instance.get(`/users/current/legal_entity/`)
	},
	updateLegalEntity(data) {
		return instance.put(`/users/current/legal_entity/`, data)
	},
	getIE() {
		return instance.get(`/users/current/ie/`)
	},
	updateIE(data) {
		return instance.put(`/users/current/ie/`, data)
	},
	getCryptoWallet() {
		return instance.get(`/users/current/crypto_wallet_details/`)
	},
	updateCryptoWallet(data) {
		return instance.put(`/users/current/crypto_wallet_details/`, data)
	},
	requestWithdraw(data){
		return instance.post(`/users/current/withdraw_balance`, data)
	}
}

export const advertiser = {
	getMyCampaigns(params) {
		return instance.get('/campaigns/my', {params})
	},
	getCampaignById(id) {
		return instance.get('/campaigns/' + id)
	},
	getPostsByCampaign(id, params) {
		return instance.get('/campaigns/' + id + '/posts',  {params})
	},
	async createPost(data) {
		let uploadPromises = data?.files?.map(file => {
				const formData = new FormData();
				formData.append('upload', file);
				return instance.post('/uploads', formData);
		});

		const uploadResponses = await Promise.all(uploadPromises);
		const fileIds = uploadResponses?.map(response => response.data.id);

		return instance.post('/campaigns/' + data.id + '/posts', {
			"name": data.name,
			"type": data.type,
			"content": data.content,
			"postUploadsIds": fileIds
		})
	},
	getPostById(id) {
		return instance.get('/campaigns/posts/' + id)
	},
	getRequests(id, params) {
		return instance.get('/campaigns/posts/' + id + '/requests', {params})
	},
	createRequests(id, data) {
		return instance.post('/campaigns/posts/' + id + '/requests', data)
	},
	createModeration(id) {
		return instance.post('/campaigns/posts/' + id + '/moderate')
	},
	createCampaign(data) {
		return instance.post('/campaigns/my', data)
	},
	getMyClients(params) {
		return instance.get('/campaigns/clients/my', {params})
	},
	getClientById(id) {
		return instance.get('/campaigns/clients/' + id)
	},
	createClient(data) {
		return instance.post('/campaigns/clients/my', data)
	},
}

export const channels = {
	getAllChannels(params) {
		return instance.get('/channels', {params})
	},
	getChannelById(id) {
		return instance.get(`/channels/${id}`)
	},
}

export const admin = {
	getRequisites(options) {
		return instance.get(options.path)
	},
	downloadDoc(userId, type) {
		const types = {
			'INDIVIDUAL_ENTREPRENEUR': '/ie/',
			'SELF_EMPLOYED': '/self_employed/',
			'LEGAL_ENTITY': '/legal_entity/',
		}

		return instance.get('/users/' + userId + types[type] + 'agreement', { responseType: 'blob' })
	}
}