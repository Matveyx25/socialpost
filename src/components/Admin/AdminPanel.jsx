import * as React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { ChannelsList } from './ChannelsList';
import { ChannelEdit } from "./ChannelEdit";
import { UserSelfEmployer } from "./UserSelfEmployer";
import { Route } from "react-router-dom";

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
		<Resource name="users" list={UserList} edit={UserEdit}>
			<Route path=":id/self_employed" element={<UserSelfEmployer />}/>
		</Resource>
    <Resource name="users" list={UserList} edit={UserEdit}/>
    <Resource name="channels" list={ChannelsList} edit={ChannelEdit} />
  </Admin>
);

export default AdminPanel;