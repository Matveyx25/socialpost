import { Chip } from "@mui/material";
import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, ChipField, FunctionField } from "react-admin";

const renderRoles = (record) => {
	if (!record?.roles || record?.roles.length === 0) {
		return null; 
	}

	const roles = record?.roles
	
	return roles?.map((role, index) => (
				<ChipField key={index} record={{role}} source="role" sx={{ marginRight: index < roles?.length - 1 ? 1 : 0 }}/>
		))
};

const renderStatus = (record) => <BooleanField source={record.status === 'CONFIRMED'}/>

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <EmailField source="emailData.email" label="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" label="Телеграм"/>
			<FunctionField label="Подтвержден" source="status" render={renderStatus}/>
			<FunctionField label="Тэг" source="tag" render={renderRoles}/>
    </Datagrid>
  </List>
);