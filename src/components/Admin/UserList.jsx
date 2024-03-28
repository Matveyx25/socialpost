import { Chip } from "@mui/material";
import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField, ArrayField, ChipField } from "react-admin";

const RolesArrayField = ({ record, source }) => {
	const roles = record[source];
	if (!roles || roles.length === 0) {
			return <div/>;
	}
	return (
			<>
					{roles.map(role => <Chip label={role} key={role}/>)}
			</>
	);
};

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <EmailField source="emailData.email" label="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" label="Телеграм"/>
			<RolesArrayField source="roles" label="Роли"/>
    </Datagrid>
  </List>
);

const TextArrayField = ({ record, source }) => {
  const array = record[source]
  if (typeof array === 'undefined' || array === null || array.length === 0) {
    return <div/>
  } else {
    return (
      <>
        {array.map(item => <Chip label={item} key={item}/>)}
      </>
    )    
  }
}
TextArrayField.defaultProps = { addLabel: true }