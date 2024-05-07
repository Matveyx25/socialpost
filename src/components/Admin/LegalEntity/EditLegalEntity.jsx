
import React from 'react'
import { Edit, SelectInput, SimpleForm } from 'react-admin';
import { FormLegalEntity } from './FormLegalEntity';

export const EditLegalEntity = ({ id}) => {
	return (
		<Edit resource={'users'} id={id + '/legal_entity/'}>
			<SimpleForm flex={1}>
				<FormLegalEntity/>
				<SelectInput source="status" choices={[
							{ id: "PENDING", name: "Данные на модерации" },
							{ id: "ACCEPTED", name: "Данные приняты" },
							{ id: "DECLINED", name: "Данные отклонены" },
						]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
