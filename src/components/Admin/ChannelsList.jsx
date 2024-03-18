import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, SingleFieldList, ReferenceArrayField } from "react-admin";

export const ChannelsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" title="Имя"/>
      <TextField source="telegramUsername" title="username"/>
      <TextField source="telegramId" title="id"/>
      <TextField source="subscribersCount" title="Подписчики"/>
      <TextField source="engagementRate" title="ER"/>
      <TextField source="costPerView" title="CPV"/>
      <TextField source="averagePostReach" title="Средний охват"/>
      <TextField source="averagePostReach" title="Средний охват"/>
      <ImageField source="imageUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} title="Фото"/>
      <BooleanField source="status" valueLabelFalse="NOT_CONFIRMED" valueLabelTrue="CONFIRMED" title="Подтвержден"/>
			<ReferenceArrayField label="Тэги" reference="tag" source="tag">
					<SingleFieldList />
			</ReferenceArrayField>
    </Datagrid>
  </List>
);