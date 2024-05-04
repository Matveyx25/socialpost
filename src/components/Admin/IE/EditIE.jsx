import React from 'react'
import { Edit, SimpleForm, useEditController } from 'react-admin';
import { FormIE } from './FormIE';

export const EditIE = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users/' + id + '/ie', id: record.id });

	return (
		<Edit>
			<SimpleForm record={record} onSubmit={saveEdit}>
				<FormIE/>
			</SimpleForm>
		</Edit>
	)
}
