import { Admin, AppBar, Layout, Resource, TitlePortal, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./User/UserList";
import { ChannelsList } from './Channel/ChannelsList';
import { ChannelEdit } from "./Channel/ChannelEdit";
import { OperationsList } from './Operations/OperationsList';
import { OperationCreate } from "./Operations/OperationCreate";
import { OperationEdit } from "./Operations/OperationEdit";
import { useNavigate } from "react-router-dom";
import { UserTabs } from "./User/UserTabs";
import {
    IconBadgeAd,
    IconFileDots,
    IconClipboardList,
    IconLogout,
    IconMoneybag,
    IconSpeakerphone,
    IconUser,
    IconDeviceMobileMessage,
		IconBell,
		IconClock,
} from "@tabler/icons-react";
import { DocumentsList } from "./Documents/DocumentsList";
import { DocumentsShow } from "./Documents/DocumentsShow";
import { Button } from "@mui/material";
import { CampaignsList } from "./Campaigns/CampaignsList";
import { CampaignsEdit } from "./Campaigns/CampaignsEdit";
import { AdvertiserPostsList } from "./AdvertiserPosts/AdvertiserPostsList";
import { AdvertiserPostsEdit } from "./AdvertiserPosts/AdvertiserPostsEdit";
import { AdvertiserClientsTabs } from "./AdvertiserClients/AdvertiserClientTabs";
import { AdvertiserClientsMainList } from "./AdvertiserClients/AdvertiserClientsMainList";
import { RequestsList } from "./Requests/RequestsList";
import { RequestsEdit } from "./Requests/RequestsEdit";
import { AdvertiserPostsTabs } from './AdvertiserPosts/AdvertiserPostsTabs';
import { DurationsList } from "./Durations/DurationsList";
import { DurationEdit } from './Durations/DurationEdit';
import { DurationCreate } from './Durations/DurationCreate';

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

const LogoutButton = () => {
	const navigate = useNavigate()
	return (
		<Button variant="text" onClick={() =>  navigate('/')}>
			<IconLogout color="#fff"/>
		</Button>
	)
};


export const MyAppBar = () => (
	<AppBar color="primary">
			<TitlePortal />
			<LogoutButton/>
	</AppBar>
);

export const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const AdminPanel = () => (
  <Admin dataProvider={dataProvider} basename="/admin" layout={MyLayout}>
		<Resource name="users" list={UserList} edit={UserTabs} options={{ label: 'Пользователи' }} icon={IconUser}/>
    <Resource name="channels" list={ChannelsList} edit={ChannelEdit} options={{ label: 'Каналы' }} icon={IconSpeakerphone}/>
    <Resource name="balance_operations" list={OperationsList} create={OperationCreate} edit={OperationEdit} options={{ label: 'Финансовые операции' }} icon={IconMoneybag}/>
    <Resource name="users/agreements" list={DocumentsList} show={DocumentsShow} options={{ label: 'Договоры' }} icon={IconFileDots}/>
    <Resource name="campaigns" list={CampaignsList} edit={CampaignsEdit} options={{ label: 'Рекламные кампании' }} icon={IconBadgeAd}/>
    <Resource name="campaigns/posts/requests" list={RequestsList} edit={RequestsEdit} options={{ label: 'Заявки на размещение' }} icon={IconBell}/>
    <Resource name="campaigns/clients" list={AdvertiserClientsMainList} edit={AdvertiserClientsTabs} options={{ label: 'Клиенты' }} icon={IconClipboardList}/>
    <Resource name="campaigns/posts" list={AdvertiserPostsList} edit={AdvertiserPostsTabs} options={{ label: 'Рекламные записи' }} icon={IconDeviceMobileMessage}/>
    <Resource name="campaigns/posts/durations" list={DurationsList} edit={DurationEdit} create={DurationCreate} options={{ label: 'Типы размещения' }} icon={IconClock}/>
  </Admin>
);

export default AdminPanel;