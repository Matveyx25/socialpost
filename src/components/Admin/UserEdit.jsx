import * as React from "react";
import { Edit, SimpleForm, TextInput, EmailInput } from "react-admin";

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      {/* <EmailInput source="email" /> */}
    </SimpleForm>
  </Edit>
);