import * as React from "react";
import { List, Datagrid, TextField, DateField } from "react-admin";

export const OperationsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="userId" label="Пользователь"/>
      <TextField source="type" label="Тип операции"/>
      <TextField source="status" label="Статус"/>
      <DateField source="dateTime" label="Дата операции"/>
    </Datagrid>
  </List>
);