import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { DateInput, Labeled, SelectArrayInput, TextField, TextInput, useRecordContext } from "react-admin"
import { channels } from "../../../api/api"

export const Cpm = () => {
	const [tags, setTags] = useState([])
	const record = useRecordContext()

	useEffect(() => {
		channels.getAllTags().then(res => {
			setTags(res?.data?.map(el => ({name: el, id: el})))
		})
	}, [])

	if(!record?.cpmStatus){
		return null
	}

	return (record?.cpmStatus ?
		<>
			<Typography variant="h6" gutterBottom>
				CPM
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<DateInput source="cpmStartDate" label="Дата начала"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<DateInput source="cpmEndDate" label="Дата конца" fullWidth/>
						</Labeled>
					</Box>
			</Box>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<SelectArrayInput fullWidth label="Тэги CPM" source="cpmTags" choices={tags} />
					</Box>
			</Box>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextInput source="cpmChannelPostsLimit" label="Лимит показов"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextInput source="cpmBudget" label="Бюджет" fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextInput source="cpmValue" label="CPM" fullWidth/>
						</Labeled>
					</Box>
			</Box>
		</> :
		<>
			<Typography variant="h6" gutterBottom>
				Информация
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="totalRequestsCount" label="Всего заявок"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextField source="activeRequestsCount" label="Активных заявок" fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextField source="completedRequestsCount" label="Выполненных заявок" fullWidth/>
						</Labeled>
					</Box>
			</Box>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="pendingRequestsCount" label="Заявок в ожидании"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextField source="declinedRequestsCount" label="Отмененых заявок" fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextField source="expiredRequestsCount" label="Просроченных заявок" fullWidth/>
						</Labeled>
					</Box>
			</Box>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="moneyBlocked" label="Заблокированно ₽"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextField source="totalMoneySpent" label="Потрачено ₽" fullWidth/>
						</Labeled>
					</Box>
			</Box>
		</>
	)
}