
import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';
import { Typography } from '@mui/material';

export const EditSelfEmployed = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/self_employed/', id: '' });

	return (
		<Edit>
				<Typography variant="h3" gutterBottom>
					Самозанятый
				</Typography>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={saveEdit}>
				<FormSelfEmployed/>
			</SimpleForm>
		</Edit>
	)
}
