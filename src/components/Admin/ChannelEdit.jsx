import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, ImageInput, SelectArrayInput, ImageField, TextField } from "react-admin";

export const ChannelEdit = (props) => (
		<Edit {...props}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<TextField source="name" title="Имя"/>
				<TextField source="telegramUsername" title="username"/>
	      <TextField source="telegramId" title="id"/>
	      <TextField source="subscribersCount" title="Подписчики"/>
        <TextField source="engagementRate" title="ER"/>
        <TextField source="costPerView" title="CPV"/>
				<ImageInput source="imageUrl" label="Фото">
						<ImageField source="." title="title" />
				</ImageInput>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="firstName" isRequired fullWidth />
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<TextInput source="lastName" fullWidth />
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
				<SelectArrayInput source="roles" choices={[
						{ id: 'NOT_CONFIRMED', name: 'NOT_CONFIRMED' },
						{ id: 'CONFIRMED', name: 'CONFIRMED' }]} />
				<hr />
		</SimpleForm>
  </Edit>
);
