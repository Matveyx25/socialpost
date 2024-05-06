
import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';

export const EditSelfEmployed = ({id}) => {
	const { record, save: saveEdit } = useEditController({ resource: 'users/' + id + '/self_employed', id: '' });

	return (
		<Edit>
			<SimpleForm flex={1} record={record} onSubmit={saveEdit}>
				<FormSelfEmployed/>
				<SelectInput source="status" choices={[
						{ id: "PENDING", name: "В ОЖИДАНИИ" },
						{ id: "EXECUTED", name: "ВЫПОЛНЕНО" },
						{ id: "DECLINED", name: "ОТКЛОНЕНО" },
					]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
