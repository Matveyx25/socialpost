import { IconDownload } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, DateField, FunctionField } from "react-admin";
import { admin } from '../../../api/api';

const renderFullName = (record) => {
	return <TextField record={record?.userFirstName + ' ' + record?.userLastName} source="userFullName"/>
};

const renderType = (record) => {
	const type = record.type

	const types = {
		'INDIVIDUAL_ENTREPRENEUR': 'ИП',
		'SELF_EMPLOYED': 'Самозанятый',
		'LEGAL_ENTITY': 'Юр. Лицо',
	}

	return <TextField record={types[type]} source="type"/>
};

const renderDownload = (record) => {
	const onClick = () => {
		admin.downloadDoc(record?.userId, record?.type)
	}

	return <IconDownload onClick={onClick} color="blue" size={20}/>
}


export const DocumentsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="userId" label="userId"/>
			<FunctionField label="Пользователь" source="userFirstName" render={renderFullName}/>
			<FunctionField label="Тип" source="type" render={renderType}/>
      <DateField source="conclusionDateTime" label="Дата"/>
			<FunctionField label="Документ" render={renderDownload}/>
    </Datagrid>
  </List>
);