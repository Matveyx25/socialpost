import * as React from "react";
import { List, Datagrid, TextField, DateField, ReferenceField, FunctionField } from "react-admin";
import { CustomEmpty } from "../CustomEmpty";


const renderStatus = (record) => {
	const status = record.status

	const statuses = {
		'PENDING': 'В ОЖИДАНИИ',
		'EXECUTED': 'ВЫПОЛНЕНО',
		'DECLINED': 'ОТКЛОНЕНО',
	}

	return <TextField record={{status: statuses[status]}} source="status"/>
};

const renderType = (record) => {
	const type = record.type

	const types = {
		'INCOME': 'Начисления',
		'WITHDRAWAL_SELF_EMPLOYED': 'Вывод у самозанятого',
		'WITHDRAWAL_IE': 'Вывод у ИП',
		'WITHDRAWAL_LEGAL_ENTITY': 'Вывод у ЮЛ',
	}

	return <TextField record={{type: types[type]}} source="type"/>
};

export const OperationsList = (props) => (
  <List {...props} empty={<CustomEmpty message={'Операций нет'}/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <FunctionField label="Тип операции" source="type" render={renderType}/>
      <FunctionField label="Статус" source="status" render={renderStatus}/>
      <DateField source="dateTime" label="Дата операции" locales="ru-RU" options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
			<ReferenceField source="userId" reference="users" label="Пользователь" />
			<TextField source="userFirstName" label="Имя" />
			<TextField source="userLastName" label="Фамилия" />
    </Datagrid>
  </List>
);