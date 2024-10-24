import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, TextInput, SelectArrayInput, TopToolbar, PrevNextButtons, SimpleForm, BooleanInput } from "react-admin";

export const UserEdit = (props) => {
	return (
		<Edit {...props} actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
		}>
			<SimpleForm>
				<Box sx={{ maxWidth: 500 }}>
					<TextInput source="photoUrl" fullWidth label="Аватар пользователя"/>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="firstName" isRequired fullWidth label="Имя"/>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="lastName" fullWidth label="Фамилия"/>
							</Box>
					</Box>
					<TextInput type="email" source="emailData.email" isRequired fullWidth label="Почта"/>
					<hr />
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Typography variant="h6" gutterBottom>
										Роли
								</Typography>
								<SelectArrayInput fullWidth label="роли" source="roles" choices={[
										{ id: 'PUBLISHER', name: 'Паблишер' },
										{ id: 'ADVERTISER', name: 'Рекламодатель' }]} />
								<BooleanInput label="Является агенством" source="isAgency"/>
							</Box>
					</Box>
					<hr />
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Typography variant="h6" gutterBottom>
										Баланс
								</Typography>
								<TextInput disabled source="balance" fullWidth label="Баланс"/>
							</Box>
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	)
};