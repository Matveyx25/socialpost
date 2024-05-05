import React from 'react'
import { FormSelfEmployed } from './FormSelfEmployed';
import { CustomCreateController } from '../CustomControllers/CustomCreateController';

export const CreateSelfEmployed = ({id}) => {		
	return (
		<CustomCreateController resource={'users'} id={id + '/self_employed/'} >
			<FormSelfEmployed />
		</CustomCreateController>
	)
}
