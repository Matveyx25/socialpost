import React, { useEffect } from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'
import { EditChannelModal } from './EditChannelModal'
import { RemoveReportModal } from './RemoveReportModal'
import { ApproveReportModal } from './ApproveReportModal'
import { WithdrawModal } from './WithdrawModal'
import { EmailModal } from './ConnectEmailModal'

export const DashboardModals = ({isOpen, setOpen, setModalParams, modalParams}) => {
	useEffect(() => {
		if(!isOpen){
			setModalParams(null)
		}
	}, [isOpen])

	return (
		<div>
			<AddChannelModal {...{isOpen, setOpen}}/>
			<RemoveChannelModal {...{isOpen, setOpen, modalParams}}/>
			<EditChannelModal {...{isOpen, setOpen, modalParams}}/>
			<RemoveReportModal {...{isOpen, setOpen}}/>
			<ApproveReportModal {...{isOpen, setOpen}}/>
			<WithdrawModal {...{isOpen, setOpen}}/>
			<EmailModal {...{isOpen, setOpen}}/>
		</div>
	)
}
