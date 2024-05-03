import { Box } from '@mui/material';
import React from 'react'
import { Create, SelectInput, SimpleForm, TextInput, useEditController } from 'react-admin'
import { useParams } from 'react-router-dom';

export const IE = () => {
	const { id } = useParams();
	
	const { record, save } = useEditController({ resource: 'users/' + id + '/ie', id: '' });

	if (!record) return <Create>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={save}>
				<Box sx={{ maxWidth: 500 }}>
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
			</SimpleForm>
		</Create>;

	return (
		<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={save}>
			<Box sx={{ maxWidth: 500 }}>
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
		</SimpleForm>
	)
}
