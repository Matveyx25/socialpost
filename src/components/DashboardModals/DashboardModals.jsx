import React, { useEffect } from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'
import { EditChannelModal } from './EditChannelModal'
import { RemoveReportModal } from './RemoveReportModal'
import { WithdrawModal } from './WithdrawModal'
import { EmailModal } from './ConnectEmailModal'
import { AddCampaignModal } from './AddCampaignModal'
import { AddClientModal } from './AddClientModal'
import { AddPostModal } from './AddPostModal'
import { AddPostToModerationModal } from './AddPostToModerationModal';
import { RefillModal } from './RefillModal'
import { DeclinePostRequestModal } from './DeclinePostRequestModal';
import { StopCPMPostModal } from './StopCPMPostModal'
import { DeclinePublisherRequestModal } from './DeclinePublisherRequestModal'

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
			<RemoveReportModal {...{isOpen, setOpen, modalParams}}/>
			<WithdrawModal {...{isOpen, setOpen}}/>
			<EmailModal {...{isOpen, setOpen}}/>
			<AddCampaignModal {...{isOpen, setOpen}}/>
			<AddClientModal {...{isOpen, setOpen}}/>
			<AddPostModal {...{isOpen, setOpen, modalParams}}/>
			<AddPostToModerationModal {...{isOpen, setOpen, modalParams}}/>
			<DeclinePostRequestModal {...{isOpen, setOpen, modalParams}}/>
			<DeclinePublisherRequestModal {...{isOpen, setOpen, modalParams}}/>
			<StopCPMPostModal {...{isOpen, setOpen, modalParams}}/>
			<RefillModal {...{isOpen, setOpen}}/>
		</div>
	)
}
