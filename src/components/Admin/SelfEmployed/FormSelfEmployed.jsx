import { Box, Typography } from '@mui/material'
import React from 'react'
import { DateInput, TextInput } from 'react-admin'

export const FormSelfEmployed = () => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
					Самозанятый
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<Box sx={{ maxWidth: 500, sm: 'flex' }}>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="citizenshipCountry" label="Гражданство" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="fullName" label="ФИО" isRequired fullWidth />
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
									<DateInput source="passportIssueDate" label="Выдан" isRequired fullWidth />
							</Box>
					</Box>
					<DateInput source="birthDate" label="Дата рождения" isRequired fullWidth />
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
				</Box>
				<Box sx={{ maxWidth: 500 }}>
					<TextInput source="bankDetails.checkingAccount" label='Расчетный счет' isRequired fullWidth />
					<TextInput source="bankDetails.bank" label='B' isRequired fullWidth />
					<TextInput source="bankDetails.bik" label='БИК' isRequired fullWidth />
					<TextInput source="bankDetails.correspondentAccount" label='Корреспондентский счет' isRequired fullWidth />
				</Box>
			</Box>
		</>
	)
}
