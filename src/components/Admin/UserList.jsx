import { Chip } from "@mui/material";
import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, SingleFieldList, ChipField } from "react-admin";

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

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" label="Имя"/>
      <TextField source="lastName" label="Фамилия"/>
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <EmailField source="emailData.email" label="Эл. почта"/>
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData" label="Телеграм"/>
			<TextArrayField source="roles" label="Роли">
				<SingleFieldList>
					<ChipField source="id" />
				</SingleFieldList>
			</TextArrayField>
    </Datagrid>
  </List>
);
