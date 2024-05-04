import { Card } from '@mui/material'
import React from 'react'
import { Tab, TabbedForm } from 'react-admin'
import { UserEdit } from './UserEdit'
import { Requisites } from '../../pages/dashboard/requisites/requisites';

export const UserTabs = () => {
	return (
		<Card>
			<TabbedForm>
				<Tab label={'Общее'}>
					<UserEdit/>
				</Tab>
				<Tab label={'Реквизиты'}>
					<Requisites/>
				</Tab>
			</TabbedForm>
		</Card>
	)
}
