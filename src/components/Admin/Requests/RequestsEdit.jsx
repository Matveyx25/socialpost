import { Box } from "@mui/material";
import {
    Edit,
    SimpleForm,
    TextField,
    TopToolbar,
    PrevNextButtons,
    Labeled,
    SelectInput,
    TextInput,
    DateField,
} from "react-admin";

export const RequestsEdit = (props) => (
		<Edit {...props}  actions={
			<TopToolbar>
					<PrevNextButtons />
			</TopToolbar>
	}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<Labeled fullWidth>
					<TextField source="postName" label="Пост"/>
				</Labeled>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<TextField source="campaignName" label="РК"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField source="channelName" label="Канал"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextField label="Цена" source="price"/>
							</Labeled>
						</Box>
				</Box>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<DateField label="Начало публикации" source="publishStartDate"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<DateField label="Конец публикации" source="publishEndDate"/>
							</Labeled>
						</Box>
				</Box>	
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<DateField label="Дата публикации" source="publishTime"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<DateField label="Дата выполнения" source="completionTime"/>
							</Labeled>
						</Box>
				</Box>	
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1}>
							<Labeled fullWidth>
								<SelectInput label="Статус" source="totalMoneySpent" choices={[
									{id: 'PENDING', name: "Ожидет публикации"},
									{id: 'ACCEPTED', name: "Подтвержденная"},
									{id: 'ACTIVE', name: "Активная"},
									{id: 'COMPLETED', name: "Выполненные"},
									{id: 'DECLINED', name: "Отклоненные"},
									{id: 'EXPIRED', name: "Просроченные"},
								]}/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput label="Причина отказа" source="declineReason"/>
							</Labeled>
						</Box>
				</Box>	
		</SimpleForm>
  </Edit>
);