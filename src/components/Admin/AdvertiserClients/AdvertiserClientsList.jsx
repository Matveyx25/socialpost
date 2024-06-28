import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';

const renderType = (record) => ( {
	AD_POST: "Размещение рекламных постов",
	NATIVE_POST: "Размещение нативных постов",
	FIXED_CPM: "Кампания с фиксированным СРМ",
}[record.typee])

const renderRole = (record) => ({
	AGENCY: "Агентство",
	ADVERTISER: "Рекламодатель",
}[record.role])

export const AdvertiserClientsList = (props) => (
  <List {...props} empty={<CustomEmpty message={'Клиентов нет'}/>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Клиент" source="client.name"/>
			<FunctionField label="Тип" source="type" render={renderType}/>
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