import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, ArrayField, SingleFieldList, ChipField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" title="Имя"/>
      <TextField source="lastName" title="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} title="Фото"/>
      <EmailField source="emailData.email" title="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" title="Телеграм"/>
			<ArrayField source="roles" title="Роли">
					<SingleFieldList linkType={false}>
							<ChipField size="small" source="."/>
					</SingleFieldList>
			</ArrayField>
    </Datagrid>
  </List>
);