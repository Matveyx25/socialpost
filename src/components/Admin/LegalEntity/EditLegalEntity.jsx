
import React from 'react'
import { Edit, SelectInput, SimpleForm } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';

export const EditLegalEntity = ({ id}) => {
	return (
		<Edit resource={'users/'} id={id + '/legal_entity/'}>
			<SimpleForm flex={1}>
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
