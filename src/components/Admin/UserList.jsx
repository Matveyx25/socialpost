import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <EmailField source="emailData.email" label="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" label="Телеграм"/>
			<ReferenceArrayField label="Роли" reference="roles" source="roles">
					<SingleFieldList />
			</ReferenceArrayField>
    </Datagrid>
  </List>
);