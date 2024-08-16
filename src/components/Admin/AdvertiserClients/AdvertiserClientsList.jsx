import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { PostPagination } from '../PostPagination';

const renderRole = (record) => ({
	AGENCY: "Агентство",
	ADVERTISER: "Рекламодатель",
}[record.role])

export const AdvertiserClientsList = (props) => (
  <List {...props} exporter={false} empty={<CustomEmpty message={'Клиентов нет'}/>} pagination={<PostPagination/>}>
    <Datagrid  bulkActionButtons={false} rowClick="edit">
      <TextField source="id" />
			<FunctionField label="Роль" source="role" render={renderRole}/>
      <TextField label="Наименование клиента" source="name"/>
      <TextField label="ИНН" source="inn"/>
      <TextField label="Номер телефона" source="phone"/>
      <TextField label="№ договора с клиентом" source="contractNumber"/>
      <TextField label="Предмет договора" source="contractSubject"/>
      <DateField label="Дата заключения договора" source="conclusionDate"/>
    </Datagrid>
  </List>
);