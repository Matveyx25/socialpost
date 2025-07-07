import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Edit, SimpleForm, TextInput, TextField, SelectInput, TopToolbar, PrevNextButtons, ShowButton, Labeled, ArrayInput, SimpleFormIterator, BooleanInput, useRecordContext } from "react-admin";
import { transformDuration } from "../../../helpers/transformDuratuin";

export const ChannelEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
		<Form/>
  </Edit>
);

const Form = (props) => {
	const record = useRecordContext()

	return (
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
						{record?.prices?.map((price, index) => (
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<TextInput source={`prices[${index}].price`} placeholder="0" label={transformDuration(price?.duration)} fullWidth />
							</Box>
						))}
				</Box>
				<hr />
				
				<Typography variant="h6" gutterBottom>
						Статус
				</Typography>
				<SelectInput label="Статус" source="status" choices={[{ id: 'NOT_CONFIRMED', name: 'НЕ ПОДТВЕРЖДЕН' },{ id: 'CONFIRMED', name: 'ПОДТВЕРЖДЕН' }]} fullWidth/>
				<hr />
				<Typography variant="h6" gutterBottom>
						ОРД
				</Typography>
				<Labeled fullWidth>
					<TextField label="ОРД ID" source="ordPadId"/>
				</Labeled>
				<BooleanInput label="ОРД подтверждено" source="isOrdConfirmed"/>
		</SimpleForm>
	)
}