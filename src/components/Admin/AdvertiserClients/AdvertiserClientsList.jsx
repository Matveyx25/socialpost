import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { PostPagination } from '../PostPagination';

const renderRole = (record) => ({
	AGENCY: "Агентство",
	ADVERTISER: "Рекламодатель",
}[record.role])

const renderClientType = (type) => ({
	PHYSICAL_ENTITY: "Физическое лицо",
	SELF_EMPLOYED: "Самозанятый",
	IE: "ИП",
	LEGAL_ENTITY: "Юридическое лицо",
}[type])

const renderInn = (record) => ({
	AGENCY: record.agencyInfo.advertiserInn,
	ADVERTISER: record.advertiserInfo.inn,
}[record.role])

const renderPhone = (record) => ({
	AGENCY: record.agencyInfo.advertiserPhone,
	ADVERTISER: record.advertiserInfo.phone,
}[record.role])

const renderType = (record) => ({
	AGENCY: renderClientType(record.agencyInfo.advertiserType),
	ADVERTISER: renderClientType(record.advertiserInfo.type),
}[record.role])

export const AdvertiserClientsList = (props) => (
  <List {...props} exporter={false} empty={<CustomEmpty message={'Клиентов нет'}/>} pagination={<PostPagination/>}>
    <Datagrid  bulkActionButtons={false} rowClick="edit">
      <TextField source="id" />
			<FunctionField label="Роль" source="role" render={renderRole}/>
      <TextField label="Наименование клиента" source="name"/>
			<FunctionField label="ИНН" render={renderInn}/>
			<FunctionField label="Номер телефона" render={renderPhone}/>
			<FunctionField label="Тип" render={renderType}/>
    </Datagrid>
  </List>
);