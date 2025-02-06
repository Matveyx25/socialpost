import { Box, Typography } from "@mui/material";
import {
    Edit,
    SimpleForm,
    FunctionField,
		TextInput,
		SelectInput,
} from "react-admin";
import { AgencyInfo } from "./AgencyInfo";

const renderInn = (record) => {
	return <TextInput source={record?.agencyInfo ? 'agencyInfo.advertiserInn' : 'advertiserInfo.inn'} label="ИНН" fullWidth/>
}

const renderPhone = (record) => {
	return <TextInput source={record?.agencyInfo ? 'agencyInfo.advertiserPhone' : 'advertiserInfo.phone'} label="Телефон" fullWidth/>
}

const renderType = (record) => {
	return <SelectInput
			label="Тип"
			source={record?.agencyInfo ? "agencyInfo.advertiserType" : "advertiserInfo.type"}
			choices={[
				{ id: "PHYSICAL_ENTITY", name: "Физическое лицо" },
				{ id: "SELF_EMPLOYED", name: "Самозанятый" },
				{ id: "IE", name: "ИП" },
				{ id: "LEGAL_ENTITY", name: "Юридическое лицо" },
			]}
			fullWidth
		/>
}

export const AdvertiserClientsEdit = (props) => (
		<Edit {...props} >
			<SimpleForm sx={{ maxWidth: 800 }}>
				<Typography variant="h5" gutterBottom>
						Клиент
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
								<TextInput source="name" label="Имя" fullWidth/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
								<FunctionField label="Тип" source="type" render={renderType}/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<SelectInput
									label="Роль"
									source='role'
									choices={[
										{ id: "AGENCY", name: "Агентство" },
										{ id: "ADVERTISER", name: "Рекламодатель" },
									]}
									fullWidth
								/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
								<FunctionField label="ИНН" source="agencyInfo" render={renderInn}/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<FunctionField label="Телефон" source="agencyInfo" render={renderPhone}/>
						</Box>
				</Box>
				<hr />
				<AgencyInfo/>			
		</SimpleForm>
  </Edit>
);