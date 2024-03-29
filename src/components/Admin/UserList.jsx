import { Chip } from "@mui/material";
import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField, ArrayField, ChipField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <EmailField source="emailData.email" label="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" label="Телеграм"/>
			<ArrayField source="roles" label="Роли">
					<SingleFieldList>
						<ChipField size="small" source="."/>
					</SingleFieldList>
			</ArrayField>
    </Datagrid>
  </List>
);