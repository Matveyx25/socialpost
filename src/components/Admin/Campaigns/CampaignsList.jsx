import * as React from "react";
import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { useParams } from "react-router-dom";

const renderType = (record) => ( {
	AD_POST: "Размещение рекламных постов",
	NATIVE_POST: "Размещение нативных постов",
	FIXED_CPM: "Кампания с фиксированным СРМ",
}[record.type])

const renderStatus = (record) => ({
	ACTIVE: "Активная",
	COMPLETED: "Завершенная",
}[record.status])

export const CampaignsList = (props) => {
	const { id } = useParams()

	return (
  <List {...props} filter={{owner_id: id}} resource={'campaigns'} empty={<CustomEmpty message={'Рекламных компаний нет'}/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Клиент" source="client.name"/>
			<FunctionField label="Тип" source="type" render={renderType}/>
      <TextField label="Общий лимит трат" source="moneyBlocked"/>
      <TextField label="Всего потрачено" source="totalMoneySpent"/>
			<FunctionField label="Статус" source="status" render={renderStatus}/>
    </Datagrid>
  </List>
)};