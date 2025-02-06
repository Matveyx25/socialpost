import { Box, Typography } from '@mui/material'
import React from 'react'
import { SelectInput, TextInput } from 'react-admin'

export const FormIE = () => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				ИП
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<Box sx={{ maxWidth: 800, sm: 'flex' }} mr={{ xs: 0, sm: '0.5em' }}>
				<TextInput source="okved" label='ОКВЭД' isRequired fullWidth />
					<TextInput source="fullName" label='ФИО' isRequired fullWidth />
					<SelectInput source="taxSystem" choices={[
						{ id: 'OSN', name: 'ОСН' },
						{ id: 'USN', name: 'УСН' }
					]} label='Система налогообложения' isRequired fullWidth />
					<TextInput source="okved" label='ОКВЭД' isRequired fullWidth />
					<TextInput source="ogrn" label='ОГРН' isRequired fullWidth />
					<TextInput source="address" label='Адрес' isRequired fullWidth />
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
