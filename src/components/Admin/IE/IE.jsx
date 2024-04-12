import React from 'react'
import { Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const IE = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/ie'}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextInput source="inn" label='ИНН' isRequired fullWidth />
				<SelectInput source="taxSystem" choices={[
					{ id: 'OSN', name: 'ОСН' },
  				{ id: 'USN', name: 'УСН' }
				]} label='Система налогообложения' isRequired fullWidth />
				<TextInput source="ogrn" label='ОГРН' isRequired fullWidth />
				<TextInput source="address" label='Адрес' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
