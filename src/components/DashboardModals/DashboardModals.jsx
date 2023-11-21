import React from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'
import { EditChannelModal } from './EditChannelModal'
import { RemoveReportModal } from './RemoveReportModal'
import { ApproveReportModal } from './ApproveReportModal'

export const DashboardModals = ({isOpen, setOpen}) => {
	return (
		<div>
			<AddChannelModal {...{isOpen, setOpen}}/>
			<RemoveChannelModal {...{isOpen, setOpen}}/>
			<EditChannelModal {...{isOpen, setOpen}}/>
			<RemoveReportModal {...{isOpen, setOpen}}/>
			<ApproveReportModal {...{isOpen, setOpen}}/>
		</div>
	)
}
