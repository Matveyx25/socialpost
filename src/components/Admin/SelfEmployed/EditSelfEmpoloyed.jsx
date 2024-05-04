
import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';
import { Typography } from '@mui/material';

export const EditSelfEmployed = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/self_employed/', id: '' });

	return (
		<Edit>
			<SimpleForm flex={1} record={record} onSubmit={saveEdit}>
				<FormSelfEmployed/>
			</SimpleForm>
		</Edit>
	)
}
