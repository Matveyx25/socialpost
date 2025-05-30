import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, TextInput, SelectArrayInput, TopToolbar, PrevNextButtons, SimpleForm, BooleanInput, Button, useGetOne, email } from "react-admin";
import { auth } from "../../../api/api";
import { useParams } from "react-router-dom";

export const UserEdit = (props) => {
	const {id} = useParams()
		
		const { data: user } = useGetOne('users', {id})

	return (
		<Edit {...props} actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
		}>
			<SimpleForm>
				<Box sx={{ maxWidth: 800 }}>
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
					{!!user?.email && <>
						<hr />
						<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
								<Box flex={1}>
										<Button label="Сбросить пароль" onClick={(e) => {
											e.preventDefault()
											e.stopPropagation()

											auth.restorePassword({email: user?.email})
										}}/>
								</Box>
						</Box>
					</>}
				</Box>
			</SimpleForm>
		</Edit>
	)
};