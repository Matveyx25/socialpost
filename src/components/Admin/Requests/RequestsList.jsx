import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField, SelectInput } from "react-admin";
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
  <List {...props} exporter={false} empty={<CustomEmpty message={'Заявок нет'}/>} filters={[ <SelectInput
		label="Статус"
		source="status"
		choices={[
			{ id: "PENDING", name: "Ожидают публикации" },
			{ id: "ACCEPTED", name: "Подтвержденные" },
			{ id: "ACTIVE", name: "Активные" },
			{ id: "COMPLETED", name: "Выполненные" },
			{ id: "DECLINED", name: "Отклоненные" },
			{ id: "EXPIRED", name: "Просроченные" },
		]}
	/> ]}>
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
