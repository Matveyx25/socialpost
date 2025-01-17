import { Box, Typography } from "@mui/material";
import {
    Edit,
    SimpleForm,
    Labeled,
    FunctionField,
		TextInput,
		SelectInput,
} from "react-admin";
import { AgencyInfo } from "./AgencyInfo";

const renderInn = (record) => {
	return <TextInput source={record?.agencyInfo ? 'agencyInfo.advertiserInn' : 'advertiserInfo.inn'} label="Имя"/>
}

const renderPhone = (record) => {
	return <TextInput source={record?.agencyInfo ? 'agencyInfo.advertiserPhone' : 'advertiserInfo.phone'} label="Телефон"/>
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
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Typography variant="h5" gutterBottom>
						Клиент
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextInput source="name" label="Имя"/>
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
								<SelectInput
									label="Роль"
									source='role'
									choices={[
										{ id: "AGENCY", name: "Агентство" },
										{ id: "ADVERTISER", name: "Рекламодатель" },
									]}
									fullWidth
								/>
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