import React from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'
import { EditChannelModal } from './EditChannelModal'
import { RemoveReportModal } from './RemoveReportModal'
import { ApproveReportModal } from './ApproveReportModal'
import { WithdrawModal } from './WithdrawModal'
import { EmailModal } from './ConnectEmailModal'

export const DashboardModals = ({isOpen, setOpen}) => {
	return (
		<div>
			<AddChannelModal {...{isOpen, setOpen}}/>
			<RemoveChannelModal {...{isOpen, setOpen}}/>
			<EditChannelModal {...{isOpen, setOpen}}/>
			<RemoveReportModal {...{isOpen, setOpen}}/>
			<ApproveReportModal {...{isOpen, setOpen}}/>
			<WithdrawModal {...{isOpen, setOpen}}/>
			<EmailModal {...{isOpen, setOpen}}/>
		</div>
	)
}
