import { Box, Card, Tab, Typography } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, DateField, useGetOne } from "react-admin";
import { AgencyInfo } from "./AgencyInfo";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { AdvertiserPostsList } from "../AdvertiserPosts/AdvertiserPostsList";
import { useParams } from "react-router-dom";

const renderType = (record) => ( {
	AD_POST: "Размещение рекламных постов",
	NATIVE_POST: "Размещение нативных постов",
	FIXED_CPM: "Кампания с фиксированным СРМ",
}[record.type])

const renderClientRole = (record) => ({
	AGENCY: "Агентство",
	ADVERTISER: "Рекламодатель",
}[record.client.role])

const renderClientType = (record) => ({
	PHYSICAL_ENTITY: "Физическое лицо",
	SELF_EMPLOYED: "Самозанятый",
	IE: "ИП",
	LEGAL_ENTITY: "Юридическое лицо",
}[record.client.type])

const renderStatus = (record) => ({
	ACTIVE: "Активная",
	COMPLETED: "Завершенная",
}[record.status])

export const CampaignsEdit = (props) => {
	const {id} = useParams()
	const [value, setValue] = useState(0)
	const { data: campaign } = useGetOne('campaigns', {id})

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
		
	
	return (
		<Card>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="basic tabs example">
						<Tab label="ОБЩЕЕ" value={0} />
						<Tab label="Рекламные записи" value={1} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<Main {...props}/>
				</TabPanel>
				<TabPanel value={1}>
					<AdvertiserPostsList campaign_id={campaign?.id}/>
				</TabPanel>
			</TabContext>
		</Card>
)};

const Main = ({props}) => {
	return <Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
		}>
			<SimpleForm sx={{ maxWidth: 800 }}>
				<TextField source="name" label="Название"/>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<FunctionField label="Тип" source="type" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<FunctionField label="Статус" source="status" render={renderStatus}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField label="Общий лимит трат" source="moneyBlocked"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField label="Всего потрачено" source="totalMoneySpent"/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				
				<Typography variant="h6" gutterBottom>
						Клиент
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField source="client.name" label="Имя"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="client.description" label="Описание"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="client.moneyAmount" label="Сумма договора"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<FunctionField label="Тип" source="client.type" render={renderClientType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<FunctionField label="Роль" source="client.status" render={renderClientRole}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField label="ИНН" source="client.inn"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField label="Телефон" source="client.phone"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField label="Номер договора" source="client.contractNumber"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField label="Объект договора" source="client.contractSubject"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<DateField label="Дата заключения договора" source="client.conclusionDate"/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				<AgencyInfo/>			
		</SimpleForm>
	</Edit>
}