import { Box } from '@mui/material'
import React from 'react'
import { SelfEmployed } from '../SelfEmployed/SelfEmployed'
import { LegalEntity } from '../LegalEntity/LegalEntity'
import { IE } from '../IE/IE'

export const Requisites = () => {
	return (
		<div>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<SelfEmployed />
			</Box>
			{/* <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<LegalEntity />
			</Box> */}
			{/* <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<IE />
			</Box> */}
		</div>
	)
}
