
import React from 'react'
import { Edit, SelectInput, SimpleForm } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';

export const EditSelfEmployed = ({id}) => {
	return (
		<Edit resource={'users/'} id={id + '/self_employed/'}>
			<SimpleForm flex={1}>
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
