import React from 'react'
import { FormIE } from './FormIE';
import { CustomCreateController } from '../CustomControllers/CustomCreateController';

export const CreateIE = ({id}) => {
	return (
		<CustomCreateController resource={'users/' + id + '/ie/'} id='' >
			<FormIE />
		</CustomCreateController>
	)
}
