import * as React from "react";
import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { useParams } from "react-router-dom";
import { PostPagination } from '../PostPagination';

const renderType = (record) => ( {
	NEW_POST: "Новая запись",
	REPOST: "Репост",
}[record.type])

const renderStatus = (record) => ({
	NOT_MODERATED: "Новый",
	MODERATING: "На проверке",
	DECLINED: "Отклоненный",
	ACCEPTED: "Активный",
}[record.status])

export const AdvertiserPostsList = (props) => {
	const { id } = useParams()

	return (
  <List {...props} filter={{owner_id: id}} resource="campaigns/posts" empty={<CustomEmpty message={'Постов нет'}/>} pagination={<PostPagination/>} bulkActionButtons={false}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="name" label="Название РК"/>
      <TextField source="campaignName" label="Название записи"/>
			<FunctionField label="Тип" source="type" render={renderType}/>
			<TextField label="Текущие заявки" source="activeRequestsCount"/>
			<TextField label="Выполненные заявки" source="completedRequestsCount"/>
			<TextField label="Заблокировано" source="moneyBlocked"/>
			<TextField label="Потрачено" source="totalMoneySpent"/>
			<FunctionField label="Статус" source="status" render={renderStatus}/>
    </Datagrid>
  </List>
)};