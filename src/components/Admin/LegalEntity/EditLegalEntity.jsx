
import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';
import { Typography } from '@mui/material';

export const EditLegalEntity = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/legal_entity/', id: '' });

	return (
		<Edit>
			<SimpleForm flex={1} record={record} onSubmit={saveEdit}>
				<FormLegalEntity/>
			</SimpleForm>
		</Edit>
	)
}