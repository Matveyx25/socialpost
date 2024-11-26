import * as React from "react";
import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { PostPagination } from '../PostPagination';

const getRole = (record) => {
	return record.agencyInfo ? 'AGENCY' : 'ADVERTISER'
}

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
}[getRole(record)])

const renderPhone = (record) => ({
	AGENCY: record.agencyInfo.advertiserPhone,
	ADVERTISER: record.advertiserInfo.phone,
}[getRole(record)])

const renderType = (record) => ({
	AGENCY: renderClientType(record.agencyInfo.advertiserType),
	ADVERTISER: renderClientType(record.advertiserInfo.type),
}[getRole(record)])

export const AdvertiserClientsList = (props) => (
  <List {...props} exporter={false} empty={<CustomEmpty message={'Клиентов нет'}/>} pagination={<PostPagination/>}>
    <Datagrid  bulkActionButtons={false} rowClick="edit">
      <TextField source="id" />
			<FunctionField label="Роль" source="role" render={renderRole}/>
      <TextField label="Наименование клиента" source="name"/>
			<FunctionField label="ИНН"  source="agencyInfo" render={renderInn}/>
			<FunctionField label="Номер телефона" source="agencyInfo" render={renderPhone}/>
			<FunctionField label="Тип" source="agencyInfo" render={renderType}/>
    </Datagrid>
  </List>
);