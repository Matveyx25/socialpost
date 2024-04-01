import * as React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { ChannelsList } from './ChannelsList';
import { ChannelEdit } from "./ChannelEdit";
import { Route } from "react-router-dom";
import { SelfEmployed } from './SelfEmployed/SelfEmployed';
import { SelfEmployedBankDetails } from './SelfEmployed/SelfEmployedBankDetails';
import { LegalEntity } from './LegalEntily/LegalEntity';
import { LegalEntityBankDetails } from "./IE/LegalEntityBankDetails";
import { IE } from './IE/IE';
import { IEBankDetails } from "./IE/IEBankDetails";
import { CryptoWallet } from "./CryptoWallet/CryptoWallet";

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
			<Route path=":id/self_employed" element={<SelfEmployed />}/>
			<Route path=":id/self_employed/bank_details" element={<SelfEmployedBankDetails />}/>
			<Route path=":id/legal_entity" element={<LegalEntity />}/>
			<Route path=":id/legal_entity/bank_details" element={<LegalEntityBankDetails />}/>
			<Route path=":id/ie" element={<IE />}/>
			<Route path=":id/ie/bank_details" element={<IEBankDetails />}/>
			<Route path=":id/crypto_wallet_details" element={<CryptoWallet/>}/>
		</Resource>
    <Resource name="channels" list={ChannelsList} edit={ChannelEdit} />
  </Admin>
);

export default AdminPanel;