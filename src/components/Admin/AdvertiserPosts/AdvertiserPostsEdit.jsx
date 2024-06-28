import { Box } from "@mui/material";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, DateField } from "react-admin";

const renderType = (record) => ( {
	NEW_POST: "Новая запись",
	REPOST: "Репост",
}[record.type])

const renderStatus = (record) => ({
	ACTIVE: "Активная",
	COMPLETED: "Завершенная",
}[record.status])

export const AdvertiserPostsEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>

		{/* {
			"campaignId": 0,
			"content": "string",
			"uploads": [
				{
					"id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
					"fileUrl": "string",
					"thumbnailUrl": "string"
				}
			],
			"telegramPostUrl": "string",
			"declineReason": "string",
			"moneyBlocked": 0,
			"totalMoneySpent": 0,
			"totalRequestsCount": 0,
			"activeRequestsCount": 0,
			"completedRequestsCount": 0
		} */}
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled>
								<TextField source="name" label="Название"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField source="type" label="Тип" render={renderType}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<FunctionField source="status" label="Статус" render={renderStatus}/>
							</Labeled>
						</Box>
				</Box>
		</SimpleForm>
  </Edit>
);