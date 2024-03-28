import { Box } from '@mui/material'
import React from 'react'
import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const UserSelfEmployer = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} resource={'/users/' + id + '/self_employed'}>
			<SimpleForm sx={{ maxWidth: 500 }}>
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
		</Edit>
	)
}
