import { Box, Typography } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { TextField, Labeled, FunctionField, DateField, useRecordContext } from "react-admin";

const renderAdvertiserType = (record) => ({
	PHYSICAL_ENTITY: "Физическое лицо",
	IE: "ИП",
	OOO: "Юридическое лицо",
}[record.client.agencyInfo.renderAdvertiserType])

const renderRecognizedByNDS = (record) => !!record.client.agencyInfo.recognizedByNDS === true ? <IconCheck/> : <IconX/>

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
							<Labeled>
								<FunctionField source="client.agencyInfo.advertiserType" label="Тип рекламодателя" render={renderAdvertiserType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.advertiserInn" label="ИНН рекламодателя"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.advertiserPhone" label="Телефон рекламодателя"/>
							</Labeled>
						</Box>
				</Box>
				<Typography variant="h6" gutterBottom>
						Данные исполнителя
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<FunctionField source="client.agencyInfo.executorType" label="Тип исполнителя" render={renderAdvertiserType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.executorInn" label="ИНН исполнителя"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.executorPhone" label="Телефон исполнителя"/>
							</Labeled>
						</Box>
				</Box>
			
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<TextField label="Номер договора" source="client.agencyInfo.contractNumber"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField label="Объект договора" source="client.agencyInfo.contractSubject"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<DateField label="Дата заключения договора" source="client.agencyInfo.conclusionDate"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField label="Признак НДС" source="client.agencyInfo.recognizedByNDS" render={renderRecognizedByNDS}/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.description" label="Описание"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="client.agencyInfo.moneyAmount" label="Сумма договора"/>
							</Labeled>
						</Box>
				</Box>
		</>
	);
}