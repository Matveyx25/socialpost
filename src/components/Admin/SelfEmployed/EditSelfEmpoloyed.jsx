
import React from 'react'
import { Edit, SelectInput, SimpleForm } from 'react-admin';
import { FormSelfEmployed } from './FormSelfEmployed';

export const EditSelfEmployed = ({id}) => {
	return (
		<Edit resource={'users'} id={id + '/self_employed/'}>
			<SimpleForm flex={1}>
				<FormSelfEmployed/>
				<SelectInput source="status" choices={[
						{ id: "PENDING", name: "Данные на модерации" },
						{ id: "ACCEPTED", name: "Данные приняты" },
						{ id: "DECLINED", name: "Данные отклонены" },
					]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
