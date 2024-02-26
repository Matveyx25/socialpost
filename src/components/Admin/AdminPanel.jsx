import * as React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";


const fetchJson = (url, options = {}) => {
	options.user = {
			authenticated: true,
			token: `Bearer ${localStorage.getItem('token')}`
	};
	if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }
	return fetchUtils.fetchJson(url, options);
};

const customDataProvider = jsonServerProvider(process.env.REACT_APP_API_URL, fetchJson);

const dataProvider = {
  ...customDataProvider,
  getList: (resource, params) =>
    customDataProvider.getList(resource, params).then((result) => {
      return { ...result};
    }),
};

const AdminPanel = () => (
  <Admin dataProvider={dataProvider} basename="/admin">
    <Resource name="users" list={UserList} edit={UserEdit} />
  </Admin>
);

export default AdminPanel;