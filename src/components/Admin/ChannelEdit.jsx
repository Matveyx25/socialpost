import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton } from "react-admin";

export const ChannelEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
					<ShowButton />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextField source="name" label="Имя"/>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								username
							</Typography>
							<TextField source="telegramUsername"/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								telegramId
							</Typography>
	      			<TextField source="telegramId" title="id"/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								Подписчики
							</Typography>
	      			<TextField source="subscribersCount" title="Подписчики"/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
									ER
							</Typography>
							<TextField source="engagementRate"/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<TextInput source="costPerView" label="CPV" fullWidth/>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="nativePostPrice" placeholder="nativePostPrice" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For24Price" placeholder="post1For24Price" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For48Price" placeholder="post1For48Price" fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post2For48Price" placeholder="post2For48Price" fullWidth />
						</Box>
				</Box>
				<hr />
				
				<Typography variant="h6" gutterBottom>
						Статус
				</Typography>
				<SelectInput source="status" choices={[{ id: 'NOT_CONFIRMED', name: 'NOT_CONFIRMED' },{ id: 'CONFIRMED', name: 'CONFIRMED' }]} />
				<hr />
		</SimpleForm>
  </Edit>
);
