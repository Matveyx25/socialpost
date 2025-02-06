import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton, Labeled, ArrayInput, SimpleFormIterator, BooleanInput } from "react-admin";

export const ChannelEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 800 }}>
				<TextInput source="name" label="Имя" fullWidth/>
				<Labeled fullWidth>
					<TextInput source="description" label="Описание" fullWidth/>
				</Labeled>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextInput source="telegramUsername" label="telegramUsername"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput source="telegramId" label="telegramId"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput source="telegramUrl" label="telegramUrl"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField source="subscribersCount" label="Подписчики"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="engagementRate" label="ER"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput source="costPerView" label="CPM"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Typography variant="h6" gutterBottom>
								Тэги
							</Typography>
							<ArrayInput source="tags">
								<SimpleFormIterator>
									<TextInput />
								</SimpleFormIterator>
							</ArrayInput>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
								<TextInput source="nativePostPrice" placeholder="0" label="Нативное размещение" fullWidth />
								<BooleanInput label="Показывать" source="nativePostPriceEnabled"/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For24Price" placeholder="0" label="1/24" fullWidth />
								<BooleanInput label="Показывать" source="post1For24PriceEnabled"/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post1For48Price" placeholder="0" label="1/48" fullWidth />
								<BooleanInput label="Показывать" source="post1For48PriceEnabled"/>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="post2For48Price" placeholder="0" label="2/48" fullWidth />
								<BooleanInput label="Показывать" source="post2For48PriceEnabled"/>
						</Box>
				</Box>
				<hr />
				
				<Typography variant="h6" gutterBottom>
						Статус
				</Typography>
				<SelectInput label="Статус" source="status" choices={[{ id: 'NOT_CONFIRMED', name: 'НЕ ПОДТВЕРЖДЕН' },{ id: 'CONFIRMED', name: 'ПОДТВЕРЖДЕН' }]} fullWidth/>
				<hr />
		</SimpleForm>
  </Edit>
);
