import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, FunctionField, ChipField, UrlField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';

const renderTags = (record) => {
	if (!record?.tag || record?.tag === '') {
		return null; 
	}

	const tags = record?.tags;
	
	return tags?.map((tag, index) => (
				<ChipField key={index} record={{tag}} source="tag" sx={{ marginRight: index < tags?.length - 1 ? 1 : 0, marginBottom: 1  }}/>
		))
};

const renderPhoto = (record) => {
	if (record.imageUrl) {
			return <img src={record.imageUrl} alt="User Photo" style={{ width: 50, height: 50, objectFit: 'cover' }} />;
	} else {
			return <div style={{ width: 50, height: 50 }} />;
	}
};

const renderStatus = (record) => record.status === 'CONFIRMED' ? <IconCheck/> : <IconX/>

export const ChannelsList = (props) => (
  <List {...props} empty={<CustomEmpty message={'Каналов нет'}/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Название"/>
      <TextField source="subscribersCount" label="Подписчики"/>
      <TextField source="engagementRate" label="ER"/>
      <TextField source="costPerView" label="CPV"/>
      <TextField source="averagePostReach" label="Средний охват поста"/>
			<FunctionField label="Фото" source="imageUrl" render={renderPhoto}/>
    	<FunctionField label="Подтвержден" source="status" render={renderStatus}/>
			<FunctionField label="Тэг" source="tag" render={renderTags}/>
			<UrlField label="Ссылка" source="telegramUrl"/>
    </Datagrid>
  </List>
);