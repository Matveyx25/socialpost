import * as React from "react";
import { Admin, ListGuesser, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./User/UserList";
import { UserEdit } from "./User/UserEdit";
import { ChannelsList } from './Channel/ChannelsList';
import { ChannelEdit } from "./Channel/ChannelEdit";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { OperationsList } from './Operations/OperationsList';
import { OperationCreate } from "./Operations/OperationCreate";
import { OperationEdit } from "./Operations/OperationEdit";
import { Route } from "react-router-dom";
import { Requisites } from "./User/Requisites";
import { UserTabs } from "./User/UserTabs";
import { IconMoneybag, IconSpeakerphone, IconUser } from "@tabler/icons-react";
import { IconFileDots } from "@tabler/icons-react";
import { DocumentsList } from "./Documents/DocumentsList";

const CustomBreadcrumbs = ({ location }) => {
	const pathnames = location.pathname.split('/').filter(x => x);

	return (
			<Breadcrumbs>
					{pathnames.map((value, index) => {
							const last = index === pathnames.length - 1;
							const to = `/${pathnames.slice(0, index + 1).join('/')}`;

							return last ? (
									<Typography key={to}>{value}</Typography>
							) : (
									<Link underline="hover"
												color="inherit"
												key={to}
												href={to}>
											{value}
									</Link>
							);
					})}
			</Breadcrumbs>
	);
};


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
	getOne: (resource, params) =>
    customDataProvider.getOne(resource, params).then((result) => {
      if(!result?.data?.id){
				return {...result, data: {...result.data, id: params.id}};
			}
			return { ...result};
    })
};

const AdminPanel = () => (
  <Admin dataProvider={dataProvider} basename="/admin" title={CustomBreadcrumbs}>
		<Resource name="users" list={UserList} edit={UserTabs} options={{ label: 'Пользователи' }} icon={IconUser}/>
    <Resource name="channels" list={ChannelsList} edit={ChannelEdit} options={{ label: 'Каналы' }} icon={IconSpeakerphone}/>
    <Resource name="balance_operations" list={OperationsList} create={OperationCreate} edit={OperationEdit} options={{ label: 'Денежные операции' }} icon={IconMoneybag}/>
    <Resource name="users/publishers/agreements" list={DocumentsList} options={{ label: 'Договоры' }} icon={IconFileDots}/>
  </Admin>
);

export default AdminPanel;