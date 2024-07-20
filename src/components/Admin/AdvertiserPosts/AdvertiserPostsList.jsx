import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';

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

export const AdvertiserPostsList = (props) => (
  <List {...props} filter={props.id ? {owner_id: props.id} : null} empty={<CustomEmpty message={'Постов нет'}/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название записи"/>
			<FunctionField label="Тип" source="type" render={renderType}/>
			<TextField label="Текущие заявки" source="activeRequestsCount"/>
			<TextField label="Выполненные заявки" source="completedRequestsCount"/>
			<FunctionField label="Статус" source="status" render={renderStatus}/>
    </Datagrid>
  </List>
);