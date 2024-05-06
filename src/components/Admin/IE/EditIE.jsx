import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormIE } from './FormIE';

export const EditIE = ({ id}) => {
	const { record, save: saveEdit } = useEditController({ resource: 'users/' + id + '/ie', id: '' });

	return (
		<Edit>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }} record={record} onSubmit={saveEdit}>
				<FormIE/>
				<SelectInput source="status" choices={[
						{ id: "PENDING", name: "В ОЖИДАНИИ" },
						{ id: "EXECUTED", name: "ВЫПОЛНЕНО" },
						{ id: "DECLINED", name: "ОТКЛОНЕНО" },
					]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
