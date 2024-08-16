import { Box } from "@mui/material";
import * as React from "react";
import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const OperationCreate = () => (
  <Create title={'Создание выплаты'}>
    <SimpleForm sx={{ maxWidth: 300 }}>
			<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
				<ReferenceInput source="userId" reference="users" label="ID пользователя" fullWidth>
					<SelectInput placeholder="Пользователь" optionText="firstName" label="Пользователь"/>
				</ReferenceInput>
			</Box>
			<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
				<SelectInput
					label="Тип"
					source="type"
					fullWidth
					choices={[
						{ id: "INCOME", name: "Поступление" },
						{ id: "WITHDRAWAL_SELF_EMPLOYED", name: "Вывод у самозанятого" },
						{ id: "WITHDRAWAL_IE", name: "Вывод у ИП" },
						{ id: "WITHDRAWAL_LEGAL_ENTITY", name: "Вывод у ЮЛ" },
						{ id: "CAMPAIGN_POST_REQUEST_INCOME", name: "Запрос на поступление от РК" },
						{ id: "CAMPAIGN_POST_REQUEST_PAYMENT", name: "Запрос на оплату РК" },
						{ id: "REPLENISHMENT_REQUEST", name: "Запрос на пополнение" },
					]}
				/>
			</Box>
			<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      	<TextInput source="amount" label="Сумма" validate={[required()]} fullWidth/>
			</Box>
    </SimpleForm>
  </Create>
);
