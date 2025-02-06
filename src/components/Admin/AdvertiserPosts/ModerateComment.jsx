import { Box, Typography } from "@mui/material"
import { useRecordContext } from "react-admin"

export const ModerateComment = () => {
	const record = useRecordContext()

	if(!record?.moderationComment){
		return null
	}

	return (
		<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
			<Box flex={1}>
				<Typography variant="h6">
					Комментарий рекламодателя
				</Typography>
				<Typography variant="p" gutterBottom>
					{record?.moderationComment}
				</Typography>
			</Box>
		</Box>
	)
}