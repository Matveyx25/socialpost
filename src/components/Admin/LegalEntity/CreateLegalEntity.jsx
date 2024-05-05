import React from 'react'
import { FormLegalEntity } from './FormLegalEntity';
import { CustomCreateController } from '../CustomControllers/CustomCreateController';

export const CreateLegalEntity = ({id}) => {
	return (
		<CustomCreateController resource={'users/' + id + '/legal_entity'} id='' >
			<FormLegalEntity />
		</CustomCreateController>
	)
}
