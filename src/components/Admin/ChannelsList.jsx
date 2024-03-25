import * as React from "react";
import { List, Datagrid, TextField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField, FunctionField } from "react-admin";

export const ChannelsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название"/>
      <TextField source="subscribersCount" label="Подписчики"/>
      <TextField source="engagementRate" label="ER"/>
      <TextField source="costPerView" label="CPV"/>
      <ImageField source="imageUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <FunctionField source="status" label="Подтверждние" render={(record,source) => 
    		<BooleanField record={{...record, status: source === 'CONFIRMED'}} source={source}/>}/>
			<ReferenceArrayField label="Тэги" reference="tag" source="tag">
					<SingleFieldList />
			</ReferenceArrayField>
    </Datagrid>
  </List>
);