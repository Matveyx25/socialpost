import { Box } from "@mui/material";
import {
    Edit,
    SimpleForm,
    TopToolbar,
    PrevNextButtons,
    Labeled,
    FunctionField,
    SelectInput,
    TextInput,
} from "react-admin";
import { Cpm } from "./CPM";
import { ModerateComment } from "./ModerateComment";
import { PostContent } from "./PostContent";

// "type": "NEW_POST",
// "campaignName": "РК 1",
// "campaignType": "AD_POST",
// "kktu": "7.1.1",

const renderType = (record) => ({
	NEW_POST: "Новая запись",
	REPOST: "Репост",
}[record.type])

export const AdvertiserPostsEdit = (props) => (
  <Edit
    {...props}
    actions={
      <TopToolbar>
        <PrevNextButtons />
      </TopToolbar>
    }
		transform={data => ({
			status: data?.status,
			declineReason: data?.declineReason,
			postUploadsIds: data?.uploads?.map(el => el.id),
			text: data?.text,
			name: data?.name,
			...(data?.cpmValue ? {cpmStartDate: data?.cpmStartDate,
			cpmEndDate: data?.cpmEndDate,
			cpmTags: data?.cpmTags,
			cpmChannelPostsLimit: data?.cpmChannelPostsLimit,
			cpmBudget: data?.cpmBudget,
			cpmValue: data?.cpmValue} : null)
		})}
  >
    <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
			<PostContent/>
			<SimpleForm sx={{ maxWidth: 800 }} ml={{ xs: 0, sm: "0.5em" }}>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<FunctionField source="type" label="Тип" render={renderType} fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<SelectInput label="Маркировка" source="markingType" fullWidth choices={[
								{id: 'NONE', name: 'Не размещать'},
								{id: 'IN_TEXT', name: 'В тексте записи'},
								{id: 'IN_VIDEO', name: 'В видео'},
								{id: 'IN_PHOTO', name: 'На фотография'},
								]}/>
						</Labeled>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextInput source="name" label="Название" fullWidth/>
						</Labeled>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<SelectInput
								label="Статус"
								source="status"
								choices={[
									{ id: "NOT_MODERATED", name: "Новый" },
									{ id: "MODERATING_MARKING", name: "На проверке маркировки" },
									{ id: "MODERATING", name: "На проверке" },
									{ id: "DECLINED", name: "Отклоненный" },
									{ id: "ACCEPTED", name: "Активный" },
								]}
								fullWidth
							/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled fullWidth>
							<TextInput label="Причина отказа" source="declineReason" fullWidth/>
						</Labeled>
					</Box>
				</Box>
				<ModerateComment/>
				<Cpm/>
			</SimpleForm>
		</Box>
  </Edit>
);
