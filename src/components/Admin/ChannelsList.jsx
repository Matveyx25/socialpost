import * as React from "react";
import { List, Datagrid, TextField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField } from "react-admin";

export const ChannelsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Имя"/>
      <TextField source="telegramUsername" label="username"/>
      <TextField source="telegramId" label="id"/>
      <TextField source="subscribersCount" label="Подписчики"/>
      <TextField source="engagementRate" label="ER"/>
      <TextField source="costPerView" label="CPV"/>
      <TextField source="averagePostReach" label="Средний охват"/>
      <TextField source="averagePostReach" label="Средний охват"/>
      <ImageField source="imageUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} label="Фото"/>
      <BooleanField source="status" valueLabelFalse="NOT_CONFIRMED" valueLabelTrue="CONFIRMED" label="Подтвержден"/>
			<ReferenceArrayField label="Тэги" reference="tag" source="tag">
					<SingleFieldList />
			</ReferenceArrayField>
    </Datagrid>
  </List>
);