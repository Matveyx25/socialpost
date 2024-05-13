import { Box, Typography } from '@mui/material'
import React from 'react'

export const CustomEmpty = ({message}) => {
	return (
		<Box textAlign="center" m={1}>
			<Typography variant="h4" paragraph>
					{message}
			</Typography>
	</Box>
	)
}