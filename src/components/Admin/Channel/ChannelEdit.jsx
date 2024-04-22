import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton } from "react-admin";

export const ChannelEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextField source="name" label="Имя"/>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								username
							</Typography>
							<TextInput source="telegramUsername" label="telegramUsername" fullWidth disabled/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								telegramId
							</Typography>
							<TextInput source="telegramId" label="telegramId" fullWidth disabled/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								Подписчики
							</Typography>
							<TextInput source="subscribersCount" label="Подписчики" fullWidth disabled/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								ER
							</Typography>
							<TextInput source="engagementRate" label="ER" fullWidth disabled/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								CPV
							</Typography>
							<TextInput source="costPerView" label="CPV" fullWidth disabled/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="nativePostPrice" placeholder="0" label="Нативное размещение" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For24Price" placeholder="0" label="1/24" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For48Price" placeholder="0" label="1/48" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post2For48Price" placeholder="0" label="2/48" fullWidth />
						</Box>
				</Box>
				<hr />
				
				<Typography variant="h6" gutterBottom>
						Статус
				</Typography>
				<SelectInput label="Статус" source="status" choices={[{ id: 'NOT_CONFIRMED', name: 'NOT_CONFIRMED' },{ id: 'CONFIRMED', name: 'CONFIRMED' }]} />
				<hr />
		</SimpleForm>
  </Edit>
);
