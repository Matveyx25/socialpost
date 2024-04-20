import { Box } from '@mui/material';
import React from 'react'
import { Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const IE = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/ie'}>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }}>
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
		</Edit>
	)
}
