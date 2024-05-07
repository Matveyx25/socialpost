import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton, Labeled } from "react-admin";

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
							<Labeled>
								<TextField source="telegramUsername" label="telegramUsername"/>
							</Labeled>

						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="telegramId" label="telegramId"/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="subscribersCount" label="Подписчики"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Labeled>
								<TextField source="engagementRate" label="ER"/>
							</Labeled>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
							<Typography variant="h6" gutterBottom>
								Тэги
							</Typography>
							<TextInput source="tag" label="Тэги" fullWidth/>
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
				<SelectInput label="Статус" source="status" choices={[{ id: 'NOT_CONFIRMED', name: 'НЕ ПОДТВЕРЖДЕН' },{ id: 'CONFIRMED', name: 'ПОДТВЕРЖДЕН' }]} />
				<hr />
		</SimpleForm>
  </Edit>
);
