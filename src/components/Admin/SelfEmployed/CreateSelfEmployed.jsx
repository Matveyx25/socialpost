import React from 'react'
import { Create, SimpleForm, useCreateController } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';
import { Typography } from '@mui/material';

export const CreateSelfEmployed = ({id}) => {
	const { record: createRecord, save: create } = useCreateController({ resource: 'users/' + id + '/self_employed/', id: '' });
		
	return (
		<Create>
				<Typography variant="h3" gutterBottom>
					Самозанятый
				</Typography>
				<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={createRecord} onSubmit={create}>
						<FormSelfEmployed />
				</SimpleForm>
		</Create>
	)
}
