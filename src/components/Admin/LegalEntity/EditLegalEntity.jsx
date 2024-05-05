
import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';

export const EditLegalEntity = ({record, id}) => {
	const { save: saveEdit } = useEditController({ resource: 'users', id: id + '/legal_entity/' });

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
