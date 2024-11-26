import { Box, Typography } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
    Edit,
    SimpleForm,
    TextField,
    TopToolbar,
    PrevNextButtons,
    Labeled,
    FunctionField,
} from "react-admin";
import { AgencyInfo } from "./AgencyInfo";

const getRole = (record) => {
	return record.agencyInfo ? 'AGENCY' : 'ADVERTISER'
}

const renderClientRole = (record) => ({
	AGENCY: "Агентство",
	ADVERTISER: "Рекламодатель",
}[record.role])

const renderClientType = (record) => ({
	PHYSICAL_ENTITY: "Физическое лицо",
	SELF_EMPLOYED: "Самозанятый",
	IE: "ИП",
	LEGAL_ENTITY: "Юридическое лицо",
}[record.type])

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

export const AdvertiserClientsEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Typography variant="h5" gutterBottom>
						Клиент
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField source="name" label="Имя"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<FunctionField label="Тип" source="type" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<FunctionField label="Роль" source="role" render={renderClientRole}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<FunctionField label="ИНН" source="agencyInfo" render={renderInn}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<FunctionField label="Телефон" source="agencyInfo" render={renderPhone}/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				<AgencyInfo/>			
		</SimpleForm>
  </Edit>
);