import axios from "axios";
import {toast} from "react-toastify";
import { setAuthToken } from "../helpers/tokens";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const errorHandler = (error) => {
	if(error?.response?.status && error?.response?.status !== 403){
		toast.error(`${error?.response?.data?.message || 'Возникла ошибка'}`);  
	}if(error?.response?.status == 401){
		localStorage.removeItem('token')
	}

  return Promise.reject({ ...error })
}

instance.interceptors.response.use(
  (response) => {return response},
  (error) => errorHandler(error)
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
				window.location.href = '/'
			})
	},
	emailConfirm(data) {
		return instance.post("/users/confirm/email", data)
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
			"hash": user?.hash
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
	}
}