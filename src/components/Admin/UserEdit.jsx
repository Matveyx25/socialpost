import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, ImageInput, SelectArrayInput, PasswordInput, ImageField, TabbedForm, DateInput } from "react-admin";

export const UserEdit = (props) => (
		<Edit {...props}>
			<TabbedForm>
					<TabbedForm.Tab label="Личная информация">
						<SimpleForm sx={{ maxWidth: 500 }}>
								<ImageInput source="photoUrl" label="Аватар пользователя">
										<ImageField source="." label="label" />
								</ImageInput>
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
						</SimpleForm>
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Самозанятый">
						<SimpleForm sx={{ maxWidth: 500 }}  resource={`/publisher/${props.id}/self_employer`}>
								<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
										<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="citizenshipCountry" isRequired fullWidth />
										</Box>
										<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="fullName" isRequired fullWidth />
										</Box>
								</Box>
								<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
										<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="passportSeries" label="Серия паспорта" isRequired fullWidth />
										</Box>
										<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="passportNumber" label="Номер паспорта" isRequired fullWidth />
										</Box>
										<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
												<DateInput source="birthDate" label="Выдан" isRequired fullWidth />
										</Box>
								</Box>
								<DateInput source="passportSeries" label="Дата рождения" isRequired fullWidth />
								<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
										<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="birthCity" label="Город рождения" isRequired fullWidth />
										</Box>
										<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="address" label="Адрес" isRequired fullWidth />
										</Box>
								</Box>
								<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
										<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="snils" label="СНИЛС" isRequired fullWidth />
										</Box>
										<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
												<TextInput source="inn" label="ИНН" isRequired fullWidth />
										</Box>
								</Box>
						</SimpleForm>
						<hr />
						<SimpleForm sx={{ maxWidth: 500 }}  resource={`/publisher/${props.id}/self_employer/bank_details`}>
							<TextInput source="checkingAccount" label="Расчетный счет" isRequired fullWidth />
							<TextInput source="bank" label="В" isRequired fullWidth />
							<TextInput source="bik" label="БИК" isRequired fullWidth />
							<TextInput source="correspondentAccount" label="Корреспондентский счет" isRequired fullWidth />
						</SimpleForm>
					</TabbedForm.Tab>
			</TabbedForm>
  </Edit>
);