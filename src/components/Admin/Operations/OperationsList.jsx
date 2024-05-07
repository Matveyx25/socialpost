import * as React from "react";
import { List, Datagrid, TextField, DateField, ReferenceField } from "react-admin";

export const OperationsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
			<ReferenceField source="userId" reference="users" label="Пользователь" />
      <TextField source="type" label="Тип операции"/>
      <TextField source="status" label="Статус"/>
      <DateField source="dateTime" label="Дата операции"/>
    </Datagrid>
  </List>
);