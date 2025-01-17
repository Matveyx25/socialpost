import { Box, Typography } from "@mui/material";
import { useRecordContext, SelectInput, TextInput, DateInput, BooleanInput } from "react-admin";

export const AgencyInfo = () =>{
	const record = useRecordContext()

	if(!record.agencyInfo){
		return null
	}

	return (
			<>
				<Typography variant="h5" gutterBottom>
						Агенство
				</Typography>
				<Typography variant="h6" gutterBottom>
						Данные рекламодателя
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<SelectInput
									label="Тип рекламодателя"
									source="agencyInfo.advertiserType"
									choices={[
										{ id: "PHYSICAL_ENTITY", name: "Физическое лицо" },
										{ id: "SELF_EMPLOYED", name: "Самозанятый" },
										{ id: "IE", name: "ИП" },
										{ id: "LEGAL_ENTITY", name: "Юридическое лицо" },
									]}
									fullWidth
								/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<TextInput source='agencyInfo.advertiserInn' label="ИНН рекламодателя" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							 <TextInput source='agencyInfo.advertiserPhone' label="Телефон рекламодателя" fullWidth/>
						</Box>
				</Box>
				<Typography variant="h6" gutterBottom>
						Данные исполнителя
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
						<SelectInput
									label="Тип исполнителя"
									source="agencyInfo.executorType"
									choices={[
										{ id: "PHYSICAL_ENTITY", name: "Физическое лицо" },
										{ id: "SELF_EMPLOYED", name: "Самозанятый" },
										{ id: "IE", name: "ИП" },
										{ id: "LEGAL_ENTITY", name: "Юридическое лицо" },
									]}
									fullWidth
								/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<TextInput source='agencyInfo.executorInn' label="ИНН исполнителя" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							 <TextInput source='agencyInfo.executorPhone' label="Телефон исполнителя" fullWidth/>
						</Box>
				</Box>
			
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<TextInput label="Номер договора" source="agencyInfo.contractNumber" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<TextInput label="Объект договора" source="agencyInfo.contractSubject" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<DateInput label="Дата заключения договора" source="agencyInfo.conclusionDate" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<BooleanInput label="Признак НДС" source="agencyInfo.recognizedByNDS"/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<TextInput label="Описание" source="agencyInfo.description" fullWidth/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<TextInput label="Сумма договора" source="agencyInfo.moneyAmount" fullWidth/>
						</Box>
				</Box>
		</>
	);
}