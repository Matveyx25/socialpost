import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const IEBankDetails = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/ie/bank_details'}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextInput source="checkingAccount" label='Расчетный счет' isRequired fullWidth />
				<TextInput source="bank" label='B' isRequired fullWidth />
				<TextInput source="bik" label='БИК' isRequired fullWidth />
				<TextInput source="correspondentAccount" label='Корреспондентский счет' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}