import React from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'
import { EditChannelModal } from './EditChannelModal'

export const DashboardModals = ({isOpen, setOpen}) => {
	return (
		<div>
			<AddChannelModal {...{isOpen, setOpen}}/>
			<RemoveChannelModal {...{isOpen, setOpen}}/>
			<EditChannelModal {...{isOpen, setOpen}}/>
		</div>
	)
}
