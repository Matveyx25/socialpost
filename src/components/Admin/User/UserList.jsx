import { Chip } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, EmailField, ChipField, FunctionField } from "react-admin";
import { CustomEmpty } from "../CustomEmpty";
import { PostPagination } from '../PostPagination';

const renderRoles = (record) => {
	if (!record?.roles || record?.roles.length === 0) {
		return null; 
	}

	const roles = record?.roles
	
	return roles?.map((role, index) => (
				<ChipField key={index} record={{role}} source="role" sx={{ marginRight: index < roles?.length - 1 ? 1 : 0, marginBottom: 1 }}/>
		))
};

const renderPhoto = (record) => {
	if (record.photoUrl) {
			return <img src={record.photoUrl} alt="User Photo" style={{ width: 50, height: 50, objectFit: 'cover' }} />;
	} else {
			return <div style={{ width: 50, height: 50 }} />;
	}
};

const renderTelegramStatus = (record) => !!record?.telegramData ? <IconCheck/> : <IconX/>

export const UserList = (props) => (
  <List {...props} empty={<CustomEmpty message={'Пользователей нет'}/>} pagination={<PostPagination/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
			<FunctionField label="Фото" source="photoUrl" render={renderPhoto}/>
      <EmailField source="emailData.email" label="Эл. почта"/>
			<FunctionField label="Телеграм" source="telegramData" render={renderTelegramStatus}/>
			<FunctionField label="Тэг" source="tag" render={renderRoles}/>
    </Datagrid>
  </List>
);