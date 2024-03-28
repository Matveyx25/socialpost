import * as React from "react";
import { List, Datagrid, TextField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField, FunctionField, ChipField } from "react-admin";

export const ChannelsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название"/>
      <TextField source="subscribersCount" label="Подписчики"/>
      <TextField source="engagementRate" label="ER"/>
      <TextField source="costPerView" label="CPV"/>
      <ImageField source="imageUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
    	<BooleanField source='status' valueLabelTrue="CONFIRMED"/>
			<ChipField size="small" label="Тэг" source="tag"/>
    </Datagrid>
  </List>
);