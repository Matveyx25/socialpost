import { Box, Typography } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, DateField } from "react-admin";
import { AgencyInfo } from "./AgencyInfo";

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
	IE: "ИП",
	OOO: "Юридическое лицо",
}[record.client.type])

const renderStatus = (record) => ({
	ACTIVE: "Активная",
	COMPLETED: "Завершенная",
}[record.status])

const renderRecognizedByNDS = (record) => !!record.client.recognizedByNDS === true ? <IconCheck/> : <IconX/>

export const CampaignsEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextField source="name" label="Название"/>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<FunctionField label="Тип" source="type" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField label="Статус" source="status" render={renderStatus}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<TextField label="Общий лимит трат" source="moneyBlocked"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
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
							<Labeled>
								<TextField source="client.name" label="Имя"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.description" label="Описание"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.moneyAmount" label="Сумма договора"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<FunctionField label="Тип" source="client.type" render={renderClientType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField label="Роль" source="client.status" render={renderClientRole}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<TextField label="ИНН" source="client.inn"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField label="Телефон" source="client.phone"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<TextField label="Номер договора" source="client.contractNumber"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField label="Объект договора" source="client.contractSubject"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<DateField label="Дата заключения договора" source="client.conclusionDate"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField label="Признак НДС" source="client.recognizedByNDS" render={renderRecognizedByNDS}/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				<AgencyInfo/>			
		</SimpleForm>
  </Edit>
);