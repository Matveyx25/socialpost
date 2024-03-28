import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, ImageInput, SelectArrayInput, PasswordInput, ImageField, Link, useRecordContext } from "react-admin";
import { useParams } from "react-router-dom";

export const UserEdit = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props}>
				<SimpleForm sx={{ maxWidth: 500 }}>
						<TextInput source="photoUrl" fullWidth label="Аватар пользователя"/>
						<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
								<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
										<TextInput source="firstName" isRequired fullWidth />
								</Box>
								<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
										<TextInput source="lastName" fullWidth />
								</Box>
						</Box>
						<TextInput type="email" source="emailData.email" isRequired fullWidth />
						<hr />
						<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
								<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<Typography variant="h6" gutterBottom>
											Роли
									</Typography>
									<SelectArrayInput source="roles" choices={[
											{ id: 'PUBLISHER', name: 'Publisher' },
											{ id: 'ADVERTISER', name: 'Advertiser' }]} />
								</Box>
								<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
										<Typography variant="h6" gutterBottom>
												Пароль
										</Typography>
										<Box display={{ xs: 'block', sm: 'flex' }}>
												<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
														<PasswordInput source="password" fullWidth />
												</Box>
										</Box>
								</Box>
						</Box>
						<Button
							component={Link}
							to={`/admin/users/${id}/self_employed`}
							>Самозанятый</Button>
				</SimpleForm>
		</Edit>
	)
};