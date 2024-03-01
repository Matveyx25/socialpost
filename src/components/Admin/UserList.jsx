import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, ArrayField, SimpleList, ReferenceArrayField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <ImageField source="photoUrl" />
      <EmailField source="emailData.email" />
      <BooleanField source="telegramData" />
			<ReferenceArrayField label="Roles" reference="roles" source="roles" />
    </Datagrid>
  </List>
);