import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, TextInput, SelectArrayInput, TopToolbar, PrevNextButtons, TabbedForm, SimpleForm } from "react-admin";
import { SelfEmployed } from "./SelfEmployed/SelfEmployed";
import { LegalEntity } from "./LegalEntity/LegalEntity";
import { IE } from "./IE/IE";

export const UserEdit = (props) => {
	return (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
		}>
			<TabbedForm>
				<TabbedForm.Tab label={'Общее'}>
					<SimpleForm sx={{ maxWidth: 500 }}>
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
								<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<Typography variant="h6" gutterBottom>
											Роли
									</Typography>
									<SelectArrayInput label="роли" source="roles" choices={[
											{ id: 'PUBLISHER', name: 'Паблишер' },
											{ id: 'ADVERTISER', name: 'Рекламодатель' }]} />
								</Box>
						</Box>
					</SimpleForm>
				</TabbedForm.Tab>
				<TabbedForm.Tab label="Реквизиты">
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<SelfEmployed />
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<LegalEntity />
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<IE />
					</Box>
				</TabbedForm.Tab>
			</TabbedForm>
		</Edit>
	)
};