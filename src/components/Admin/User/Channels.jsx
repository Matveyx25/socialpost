import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { List, Datagrid, TextField, FunctionField, ChipField, UrlField, Show } from "react-admin";
import { useParams } from "react-router-dom";
import { CustomEmpty } from "../CustomEmpty";

const renderTags = (record) => {
	if (!record?.tags || record?.tags?.length <= 0) {
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

export const Channels = () => {
	const { id } = useParams();

	return (
	 <List exporter={false} resource={'channels'} filter={{owner_id: id}} empty={<CustomEmpty message={'Каналов нет'}/>}>
		 <Datagrid rowClick="edit">
			 <TextField source="id" />
			 <TextField source="name" label="Название"/>
			 <TextField source="subscribersCount" label="Подписчики"/>
			 <TextField source="engagementRate" label="ER"/>
			 <TextField source="costPerView" label="CPV"/>
			 <TextField source="averagePostReach" label="Средний охват поста"/>
			 <FunctionField label="Фото" source="imageUrl" render={renderPhoto}/>
			 <FunctionField label="Подтвержден" source="status" render={renderStatus}/>
			 <FunctionField label="Тэги" source="tags" render={renderTags}/>
			 <UrlField label="Ссылка" source="telegramUrl"/>
		 </Datagrid>
	 </List>
 );
}