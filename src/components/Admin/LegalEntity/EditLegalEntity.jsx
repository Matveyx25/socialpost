
import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';
import { Typography } from '@mui/material';

export const EditLegalEntity = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/legal_entity/', id: '' });

	return (
		<Edit>
				<Typography variant="h3" gutterBottom>
					Юр. лицо
				</Typography>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={saveEdit}>
				<FormLegalEntity/>
			</SimpleForm>
		</Edit>
	)
}
