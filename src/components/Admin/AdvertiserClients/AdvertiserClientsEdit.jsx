import { Box, Typography } from "@mui/material";
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

const renderInn = (record) => {
	return record?.agencyInfo ? record?.agencyInfo?.advertiserInn : record?.advertiserInfo?.inn
}

const renderPhone = (record) => {
	return record?.agencyInfo ? record?.agencyInfo?.advertiserPhone : record?.advertiserInfo?.phone
}

const renderType = (record) => {
	return record?.agencyInfo ? renderClientType(record?.agencyInfo?.advertiserType) : renderClientType(record?.advertiserInfo?.type)
}

export const AdvertiserClientsEdit = (props) => (
		<Edit {...props} >
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