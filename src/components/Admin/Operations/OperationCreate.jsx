import { Box } from "@mui/material";
import * as React from "react";
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const OperationCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 300 }}>
			<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
				<TextInput
					source="userId"
					validate={[required()]}
					fullWidth
					label="ID пользователя"
				/>
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
					]}
				/>
			</Box>
			<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      	<TextInput source="amount" label="Сумма" validate={[required()]} fullWidth/>
			</Box>
    </SimpleForm>
  </Create>
);
