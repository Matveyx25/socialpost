import { Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, SelectInput, TextInput, useRecordContext, SelectArrayInput, DateField, DateInput } from "react-admin";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import s from './style.module.scss'
import { useEffect } from "react";
import { channels } from "../../../api/api";
import { useState } from "react";
import { PostAttachments } from "../../Shared/PostAttachments/PostAttachments";
import { PostContent as PostContentText } from '../../Shared/PostContent/PostContent';


const Cpm = () => {
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

	return (
		<>
			<Typography variant="h6" gutterBottom>
				CPM
			</Typography>
			<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
					<Box flex={1}>
						<Labeled>
							<DateInput source="cpmStartDate" label="Дата начала"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
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
						<Labeled>
							<TextInput source="cpmChannelPostsLimit" label="Лимит показов"  fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextInput source="cpmBudget" label="Бюджет" fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<TextInput source="cpmValue" label="CPM" fullWidth/>
						</Labeled>
					</Box>
			</Box>
		</>
	)
}

const ModerateComment = () => {
	const record = useRecordContext()

	if(!record?.moderationComment){
		return null
	}

	return (
		<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
			<Box flex={1}>
				<Typography variant="h6">
					Комментарий рекламодателя
				</Typography>
				<Typography variant="p" gutterBottom>
					{record?.moderationComment}
				</Typography>
			</Box>
		</Box>
	)
}

const renderType = (record) => ({
	NEW_POST: "Новая запись",
	REPOST: "Репост",
}[record.type])

const PostContent = () => {
	const post = useRecordContext()

	return <div className={s.post}>
		<PostAttachments attachments={post?.uploads}/>
		<PostContentText text={post?.text}/>
		<div className={s.content}>
			<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
				{DOMPurify.sanitize(post?.text)}
			</Markdown>
		</div>
	</div>
}

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
			<SimpleForm sx={{ maxWidth: 500 }} ml={{ xs: 0, sm: "0.5em" }}>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled>
							<TextInput source="name" label="Название" fullWidth/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
							<FunctionField source="type" label="Тип" render={renderType} />
						</Labeled>
					</Box>
				</Box>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled>
							<SelectInput
								label="Статус"
								source="status"
								choices={[
									{ id: "NOT_MODERATED", name: "Новый" },
									{ id: "MODERATING", name: "На проверке" },
									{ id: "DECLINED", name: "Отклоненный" },
									{ id: "ACCEPTED", name: "Активный" },
								]}
								fullWidth
							/>
						</Labeled>
					</Box>
					<Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
						<Labeled>
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
