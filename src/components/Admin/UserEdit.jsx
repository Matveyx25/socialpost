import * as React from "react";
import { Edit, SimpleForm, TextInput, ImageInput, SelectArrayInput } from "react-admin";

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
			<TextInput disabled source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <ImageInput source="photoUrl" />
      <TextInput source="emailData.email" />
      <TextInput disabled source="telegramData.telegramId" />
			<SelectArrayInput source="roles" choices={[
                { id: 'PUBLISHER', name: 'Publisher' },
                { id: 'ADVERTISER', name: 'Advertiser' }]} />
    </SimpleForm>
  </Edit>
);