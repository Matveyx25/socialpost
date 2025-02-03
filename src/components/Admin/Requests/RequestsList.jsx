import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';

const renderStatus = (record) => ({
	PENDING: "Ожидет публикации",
	ACCEPTED: "Подтвержденная",
	ACTIVE: "Активная",
	COMPLETED: "Выполненные",
	DECLINED: "Отклоненные",
	EXPIRED: "Просроченные",
}[record.status])

export const RequestsList = (props) => {
	return (
  <List {...props} exporter={false} empty={<CustomEmpty message={'Заявок нет'}/>}>
    <Datagrid  bulkActionButtons={false} rowClick="edit">
			<TextField source="id" />
			<TextField source="channelName" label="Название канала"/>
			<TextField source="postName" label="Пост"/>
			<DateField source="publishTime" label="Дата публикации"/>
			<DateField source="completionTime" label="Дата выполнения"/>
			<TextField source="price" label="Стоимость размещения"/>
			<FunctionField source="price" label="Статус" render={renderStatus}/>
    </Datagrid>
  </List>
)};
