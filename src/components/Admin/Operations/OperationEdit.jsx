import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton, DateInput, Labeled, DateField } from "react-admin";

export const OperationEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Typography variant="h6" gutterBottom>
					Пользователь
				</Typography>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="userId" label="Id"/>
							</Labeled>
						</Box>
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
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
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
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								Сумма
							</Typography>
							<TextInput source="amount" placeholder="0" label="Сумма" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<DateField source="dateTime" label="Дата операции"/>
								</Labeled>
						</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<SelectInput
									label="Тип"
									source="type"
									choices={[
										{ id: "INCOME", name: "Поступление" },
										{ id: "WITHDRAWAL_SELF_EMPLOYED", name: "Вывод у самозанятого" },
										{ id: "WITHDRAWAL_IE", name: "Вывод у ИП" },
										{ id: "WITHDRAWAL_LEGAL_ENTITY", name: "Вывод у ЮЛ" },
									]}
								/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<SelectInput
									label="Статус"
									source="status"
									choices={[
										{ id: "PENDING", name: "В ОЖИДАНИИ" },
										{ id: "EXECUTED", name: "ВЫПОЛНЕНО" },
										{ id: "DECLINED", name: "ОТКЛОНЕНО" },
									]}
								/>
						</Box>
				</Box>
		</SimpleForm>
  </Edit>
);
