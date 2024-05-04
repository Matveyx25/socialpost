import React from 'react'
import { Create, SimpleForm, useCreateController } from 'react-admin';
import { FormIE } from './FormIE';

export const CreateIE = ({id}) => {
	const { record: createRecord, save: create } = useCreateController({ resource: 'users/' + id + '/ie', id: '' });
		
	return (
		<Create>
				<SimpleForm record={createRecord} onSubmit={create}>
						<FormIE />
				</SimpleForm>
		</Create>
	)
}
