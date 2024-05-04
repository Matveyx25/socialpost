import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormIE } from './FormIE';
import { Typography } from '@mui/material';

export const EditIE = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/ie/', id: '' });

	return (
		<Edit>
			<Typography variant="h3" gutterBottom>
				ИП
			</Typography>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={saveEdit}>
				<FormIE/>
			</SimpleForm>
		</Edit>
	)
}
