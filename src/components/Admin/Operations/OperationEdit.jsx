import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextField, SelectInput, TopToolbar, PrevNextButtons, Labeled, DateField, FunctionField } from "react-admin";


const renderType = (record) => {
	const type = record.type

	const types = {
		'INCOME': 'Начисления',
		'WITHDRAWAL_SELF_EMPLOYED': 'Вывод у самозанятого',
		'WITHDRAWAL_IE': 'Вывод у ИП',
		'WITHDRAWAL_LEGAL_ENTITY': 'Вывод у ЮЛ',
	}

	return <TextField record={{type: types[type]}} source="type"/>
};

export const OperationEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Typography variant="h6" gutterBottom>
					Пользователь №{props?.record.id}
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="userFirstName" label="Имя"/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="userLastName" label="Фамилия"/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="userBalance" label="Баланс пользователя"/>
							</Labeled>
						</Box>
				</Box>
				<hr />
				<Typography variant="h6" gutterBottom>
					Операция
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField label="Тип операции" source="type" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="amount" label="Сумма"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<DateField source="dateTime" label="Дата операции"
									transform={value =>
									(new Date(value)).toLocaleDateString('ru-RU', {})
									}	/>
								</Labeled>
						</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }} sx={{mt: 16}}>
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
  </Edit>
);
