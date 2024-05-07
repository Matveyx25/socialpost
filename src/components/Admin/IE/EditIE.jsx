import React from 'react'
import { Edit, SelectInput, SimpleForm, useEditController } from 'react-admin';
import { FormIE } from './FormIE';

export const EditIE = ({ id}) => {
	return (
		<Edit resource={'users'} id={id + '/ie/'}>
			<SimpleForm flex={1} mr={{ xs: 0, sm: '0.5em' }}>
				<FormIE/>
				<SelectInput source="status" choices={[
						{ id: "PENDING", name: "В ОЖИДАНИИ" },
						{ id: "ACCEPTED", name: "ПРИНЯТО" },
						{ id: "DECLINED", name: "ОТКЛОНЕНО" },
					]} label='Статус' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
