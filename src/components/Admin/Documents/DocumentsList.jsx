import { IconDownload } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, DateField, FunctionField, ReferenceField } from "react-admin";
import { admin } from '../../../api/api';

const renderType = (record) => {
	const type = record.type

	const types = {
		'INDIVIDUAL_ENTREPRENEUR': 'ИП',
		'SELF_EMPLOYED': 'Самозанятый',
		'LEGAL_ENTITY': 'Юр. Лицо',
	}

	return <TextField record={{type: types[type]}} source="type"/>
};

const renderDownload = (record) => {
	const onClick = () => {
		admin.downloadDoc(record?.userId, record?.type).then(blob => {
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob.data);
			link.download = 'Договор_' + record?.type;
			link.click();
		}).catch(error => console.error(error));
	}

	return <IconDownload onClick={onClick} color="blue" size={20}/>
}


export const DocumentsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
			<ReferenceField source="userId" reference="users" label="Пользователь" />
			<TextField source="userFirstName" label="Имя" />
			<TextField source="userLastName" label="Фамилия" />
			<FunctionField label="Тип" source="type" render={renderType}/>
      <DateField source="conclusionDateTime" label="Дата"/>
			<FunctionField label="Документ" render={renderDownload}/>
    </Datagrid>
  </List>
);