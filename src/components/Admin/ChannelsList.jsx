import * as React from "react";
import { List, Datagrid, TextField, ImageField, BooleanField, FunctionField, ChipField } from "react-admin";

const renderTags = (record) => {
	if (!record?.tag || record?.tag === '') {
		return null; 
	}

	const tags = record?.tag.split(';');
	
	return tags.map((tag, index) => (
			<ChipField key={index} source={tag} />
	));
};

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
			<FunctionField label="Тэг" source="tag" render={renderTags}/>
    </Datagrid>
  </List>
);