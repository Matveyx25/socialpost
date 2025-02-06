import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextField, SelectInput, TopToolbar, PrevNextButtons, Labeled, DateField, FunctionField, useRecordContext } from "react-admin";


const renderType = (record) => {
	const type = record.type

	const types = {
		'INCOME': 'Начисления',
		'WITHDRAWAL_SELF_EMPLOYED': 'Вывод у самозанятого',
		'WITHDRAWAL_IE': 'Вывод у ИП',
		'WITHDRAWAL_LEGAL_ENTITY': 'Вывод у ЮЛ',
		"CAMPAIGN_POST_REQUEST_INCOME": 'Запрос на поступление от РК',
		"CAMPAIGN_POST_REQUEST_PAYMENT": 'Запрос на оплату РК',
		"REPLENISHMENT_REQUEST": 'Запрос на пополнение',
	}

	return <TextField record={{type: types[type]}} source="type"/>
};

const Form = () => {
	const record = useRecordContext()

	return (
		<SimpleForm sx={{ maxWidth: 800 }}>
				<Typography variant="h6" gutterBottom>
					Пользователь №{record.id}
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="userFirstName" label="Имя"/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="userLastName" label="Фамилия"/>
							</Labeled>
						</Box>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField source="userBalance" label="Баланс пользователя"/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				<Typography variant="h6" gutterBottom>
					Операция
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<FunctionField label="Тип операции" source="type" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="amount" label="Сумма"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled fullWidth>
									<DateField source="dateTime" label="Дата операции" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
								</Labeled>
						</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }} sx={{mt: '1rem'}}>
						<SelectInput
							label="Статус"
							source="status"
							choices={[
								{ id: "PENDING", name: "В ОЖИДАНИИ" },
								{ id: "EXECUTED", name: "ВЫПОЛНЕНО" },
								{ id: "DECLINED", name: "ОТКЛОНЕНО" },
							]}
							fullWidth
						/>
				</Box>
		</SimpleForm>
	)
}

export const OperationEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<Form/>
  </Edit>
);
