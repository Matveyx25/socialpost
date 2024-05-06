
import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';

export const EditLegalEntity = ({ id}) => {
	const { record, save: saveEdit } = useEditController({ resource: 'users/' + id + '/legal_entity', id: '' });

	return (
		<Edit>
			<SimpleForm flex={1} record={record} onSubmit={saveEdit}>
				<FormLegalEntity/>
				<SelectInput source="status" choices={[
							{ id: "PENDING", name: "В ОЖИДАНИИ" },
							{ id: "EXECUTED", name: "ВЫПОЛНЕНО" },
							{ id: "DECLINED", name: "ОТКЛОНЕНО" },
						]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
