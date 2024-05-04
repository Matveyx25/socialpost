import React from 'react'
import { Create, SimpleForm, useCreateController } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';
import { Typography } from '@mui/material';

export const CreateLegalEntity = ({id}) => {
	const { record: createRecord, save: create } = useCreateController({ resource: 'users/' + id + '/legal_entity/', id: '' });
		
	return (
		<Create>
				<Typography variant="h3" gutterBottom>
					Юр. лицо
				</Typography>
				<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={createRecord} onSubmit={create}>
						<FormLegalEntity />
				</SimpleForm>
		</Create>
	)
}
