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
	login(data) {
		return instance.post("/login", {...data}).then(response => {
				setAuthToken(response.data.accessToken);
				localStorage.setItem('token', response.data.accessToken)
				window.location.href = '/'
			}).catch(err => {
				console.log(err);
			})
	},
	me() {
		return instance.get("/users/current")
	},
	logout() {
		setAuthToken();
		localStorage.removeItem('token')
		window.location.href = '/'
	}
}
