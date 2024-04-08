import * as React from "react";
import { List, Datagrid, TextField, ImageField, BooleanField, FunctionField, ChipField, UrlField } from "react-admin";
import { NavLink } from "react-router-dom";

const renderTags = (record) => {
	if (!record?.tag || record?.tag === '') {
		return null; 
	}

	const tags = record?.tag.split(';');
	
	return tags.map((tag, index) => (
				<ChipField key={index} record={{tag}} source="tag" sx={{ marginRight: index < tags?.length - 1 ? 1 : 0, marginBottom: 1  }}/>
		))
};

export const ChannelsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название"/>
      <TextField source="subscribersCount" label="Подписчики"/>
      <TextField source="engagementRate" label="ER"/>
      <TextField source="costPerView" label="CPV"/>
      <TextField source="averagePostReach" label="Средний охват поста"/>
      <ImageField source="imageUrl" sx={{ '& img': { width: 50, height: 50, objectFit: 'contain' } }} label="Фото"/>
    	<BooleanField source='status' valueLabelTrue="CONFIRMED"/>
			<FunctionField label="Тэг" source="tag" render={renderTags}/>
			<UrlField label="Ссылка" source="telegramUrl"/>
    </Datagrid>
  </List>
);