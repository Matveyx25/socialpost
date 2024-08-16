import * as React from "react";
import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { useParams } from "react-router-dom";
import { PostPagination } from '../PostPagination';

const renderType = (record) => ( {
	AD_POST: "Размещение рекламных постов",
	NATIVE_POST: "Размещение нативных постов",
	FIXED_CPM: "Кампания с фиксированным СРМ",
}[record.type])

const renderStatus = (record) => ({
	ACTIVE: "Активная",
	COMPLETED: "Завершенная",
}[record.status])

const renderCount = (record) => {
	return (+record?.activePostsCount +
					+record?.notModeratedPostsCount +
					+record?.moderatingPostsCount +
					+record?.acceptedPostsCount +
					+record?.declinedPostsCount +
					+record?.archivedPostsCount)
}

export const CampaignsList = (props) => {
	const { id } = useParams()

	return (
  <List {...props} filter={{owner_id: id}} resource={'campaigns'} empty={<CustomEmpty message={'Рекламных кампаний нет'}/>} pagination={<PostPagination/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Клиент" source="client.name"/>
			<FunctionField label="Тип" source="type" render={renderType}/>
			<FunctionField label="Кол-во записей" render={renderCount}/>
      <TextField label="Общий лимит трат" source="moneyBlocked"/>
      <TextField label="Всего потрачено" source="totalMoneySpent"/>
			<FunctionField label="Статус" source="status" render={renderStatus}/>
    </Datagrid>
  </List>
)};