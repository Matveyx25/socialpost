import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormIE } from './FormIE';

export const EditIE = ({ id}) => {
	return (
		<Edit resource={'users'} id={id + '/ie/'}>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }}>
				<FormIE/>
				<SelectInput source="status" choices={[
						{ id: "PENDING", name: "Данные на модерации" },
						{ id: "ACCEPTED", name: "Данные приняты" },
						{ id: "DECLINED", name: "Данные отклонены" },
					]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
