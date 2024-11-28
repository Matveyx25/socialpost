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

const renderInn = (record) => {
	return record?.agencyInfo ? record?.agencyInfo?.advertiserInn : record?.advertiserInfo?.inn
}

const renderPhone = (record) => {
	return record?.agencyInfo ? record?.agencyInfo?.advertiserPhone : record?.advertiserInfo?.phone
}

const renderType = (record) => {
	return record?.agencyInfo ? renderClientType(record?.agencyInfo?.advertiserType) : renderClientType(record?.advertiserInfo?.type)
}

export const AdvertiserContrAgentList = (props) => (
  <List {...props} exporter={false} resource={'campaigns/clients/'} filter={{isSelfPromoted: true}} empty={<CustomEmpty message={'Клиентов нет'}/>} pagination={<PostPagination/>}>
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