import { IconDownload } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, DateField, FunctionField, ReferenceField, ShowButton, Pagination } from "react-admin";
import { admin } from '../../../api/api';
import { CustomEmpty } from '../CustomEmpty';
import { PostPagination } from "../PostPagination";

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
		admin.downloadDoc(record?.userId, record?.type).then(data => {
			const blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
			const link = document.createElement('a');
			const date = new Date(record?.conclusionDateTime)
			link.href = window.URL.createObjectURL(blob);
			link.download = 'Договор_№' + record?.id + '_' + date?.toLocaleDateString('ru-RU', {}) + '.docx';
			link.click();
			window.URL.revokeObjectURL(link.href);
		}).catch(error => console.error(error));
	}

	return <IconDownload onClick={onClick} color="blue" size={20}/>
}

export const DocumentsList = (props) => (
  <List {...props} empty={<CustomEmpty message={'Документов нет'}/>} bulkActionButtons={false} pagination={<PostPagination/>}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <DateField source="conclusionDateTime" label="Дата" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
			<ReferenceField source="userId" reference="users" label="Пользователь" />
			<TextField source="userFirstName" label="Имя" />
			<TextField source="userLastName" label="Фамилия" />
			<FunctionField label="Статус реквизитов" source="type" render={renderType}/>
			<FunctionField label="Документ" render={renderDownload}/>
			<>
				<ShowButton />
			</>
    </Datagrid>
  </List>
);