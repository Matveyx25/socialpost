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
				<Box sx={{ maxWidth: 800, sm: 'flex' }} mr={{ xs: 0, sm: '0.5em' }}>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<TextInput source="fullName" label="ФИО" isRequired fullWidth />
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<TextInput source="passportSeries" label="Серия паспорта" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="passportNumber" label="Номер паспорта" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<DateInput source="passportIssueDate" label="Выдан" isRequired fullWidth parse={(date) => (date ? date.toLocaleDateString('ru-RU', {}) : null)}/>
							</Box>
					</Box>
					<DateInput source="birthDate" label="Дата рождения" isRequired fullWidth parse={(date) => (date ? date.toLocaleDateString('ru-RU', {}) : null)}/>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<TextInput source="birthCity" label="Город рождения" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="address" label="Адрес" isRequired fullWidth />
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<TextInput source="snils" label="СНИЛС" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="inn" label="ИНН" isRequired fullWidth />
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source="vatRate" label="НДС" isRequired fullWidth />
							</Box>
					</Box>
				</Box>
				<Box sx={{ maxWidth: 800 }} ml={{ xs: 0, sm: '0.5em' }}>
					<TextInput source="bankDetails.checkingAccount" label='Расчетный счет' isRequired fullWidth />
					<TextInput source="bankDetails.bank" label='Банк' isRequired fullWidth />
					<TextInput source="bankDetails.bik" label='БИК' isRequired fullWidth />
					<TextInput source="bankDetails.correspondentAccount" label='Корреспондентский счет' isRequired fullWidth />
				</Box>
			</Box>
		</>
	)
}
