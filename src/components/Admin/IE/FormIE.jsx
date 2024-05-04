import { Box, Typography } from '@mui/material'
import React from 'react'
import { SelectInput, TextInput } from 'react-admin'

export const FormIE = () => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				ИП
			</Typography>
			<Box sx={{ maxWidth: 500, sm: 'flex' }}>
				<TextInput source="inn" label='ИНН' isRequired fullWidth />
				<SelectInput source="taxSystem" choices={[
					{ id: 'OSN', name: 'ОСН' },
					{ id: 'USN', name: 'УСН' }
				]} label='Система налогообложения' isRequired fullWidth />
				<TextInput source="ogrn" label='ОГРН' isRequired fullWidth />
				<TextInput source="address" label='Адрес' isRequired fullWidth />
			</Box>
			<Box sx={{ maxWidth: 500 }}>
				<TextInput source="bankDetails.checkingAccount" label='Расчетный счет' isRequired fullWidth />
				<TextInput source="bankDetails.bank" label='B' isRequired fullWidth />
				<TextInput source="bankDetails.bik" label='БИК' isRequired fullWidth />
				<TextInput source="bankDetails.correspondentAccount" label='Корреспондентский счет' isRequired fullWidth />
			</Box>
		</>
	)
}
