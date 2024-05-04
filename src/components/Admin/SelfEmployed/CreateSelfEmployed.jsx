import React from 'react'
import { FormSelfEmployed } from './FormSelfEmployed';
import { CustomCreateController } from '../CustomControllers/CustomCreateController';

export const CreateSelfEmployed = ({id}) => {		
	return (
		<CustomCreateController resource={'users/' + id + '/self_employed/'} id='' >
			<FormSelfEmployed />
		</CustomCreateController>
	)
}
