import { Box, Typography } from '@mui/material'
import React from 'react'
import { SelectInput, TextInput } from 'react-admin'

export const FormLegalEntity = () => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Юр. лицо
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<Box sx={{ maxWidth: 500, sm: 'flex' }}>	
					<TextInput source="inn" label='ИНН' isRequired fullWidth />
					<SelectInput source="taxSystem" choices={[
						{ id: 'OSN', name: 'ОСН' },
						{ id: 'USN', name: 'УСН' }
					]} label='Система налогообложения' isRequired fullWidth />
					<TextInput source="ogrn" label='ОГРН' isRequired fullWidth />
					<TextInput source="legalAddress" label='Юридический адрес' isRequired fullWidth />
					<TextInput source="correspondenceAddress" label='Адрес для корреспонденции' isRequired fullWidth />
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
