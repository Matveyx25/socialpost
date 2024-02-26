import axios from "axios";
import {toast} from "react-toastify";
import { setAuthToken } from "../helpers/tokens";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const errorHandler = (error) => {
	if(error?.response?.status && error?.response?.status !== 403){
		toast.error(`${error?.response?.data?.message || 'Возникла ошибка'}`);  
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
	loginTelegram(data) {
		return instance.post("/login/telegram", {...data}).then(response => {
				setAuthToken(response.data.accessToken);
				localStorage.setItem('token', response.data.accessToken)
				window.location.href = '/'
			}).catch(err => {
				console.log(err);
			})
	},
	loginEmail(data) {
		return instance.post("/login/email", {...data}).then(response => {
				setAuthToken(response.data.accessToken);
				localStorage.setItem('token', response.data.accessToken)
				window.location.href = '/'
			}).catch(err => {
				console.log(err);
			})
	},
	registrationEmail(data) {
		return instance.post("/users/registration/by_email", data)
	},
	registrationTelegram(data) {
		return instance.post("/users/registration/by_telegram", data)
	},
	// {
	// 	"email": "string",
	// 	"password": "string",
	// 	"firstName": "string",
	// 	"lastName": "string",
	// 	"photoUrl": "string"
	// }
	me() {
		return instance.get("/users/current")
	},
	logout() {
		setAuthToken();
		localStorage.removeItem('token')
		window.location.href = '/'
	}
}
