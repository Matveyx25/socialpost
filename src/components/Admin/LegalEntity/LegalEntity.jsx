import React from 'react'
import { Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const LegalEntity = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/legal_entity'}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextInput source="inn" label='ИНН' isRequired fullWidth />
				<SelectInput source="taxSystem" choices={[
					{ id: 'OSN', name: 'ОСН' },
  				{ id: 'USN', name: 'УСН' }
				]} label='Система налогообложения' isRequired fullWidth />
				<TextInput source="ogrn" label='ОГРН' isRequired fullWidth />
				<TextInput source="legalAddress" label='Юридический адрес' isRequired fullWidth />
				<TextInput source="correspondenceAddress" label='Адрес для корреспонденции' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
