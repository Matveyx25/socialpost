import { Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, SelectInput, TextInput, useRecordContext, ArrayInput, SimpleFormIterator, SelectArrayInput } from "react-admin";
import { ImageGrid } from 'react-fb-image-video-grid';
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import s from './style.module.scss'
import { useEffect } from "react";
import { channels } from "../../../api/api";
import { useState } from "react";


const CpmTags = () => {
	const [tags, setTags] = useState([])
	const record = useRecordContext()

	useEffect(() => {
		channels.getAllTags().then(res => {
			setTags(res.data.data.map(el => ({name: el, id: el})))
		})
	}, [])

	if(!record?.cpmStatus){
		return null
	}

	return (
		<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
				<Box flex={1}>
					<Typography variant="h6" gutterBottom>
						Тэги CPM
					</Typography>
					<SelectArrayInput fullWidth label="Тэги CPM" source="cpmTags" choices={tags} />
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
		{post?.uploads.length ? <div className={s.preview}>
				<ImageGrid showModal={false}>
					{post?.uploads?.map(img => 
						<div>
							<img src={img.thumbnailUrl} alt="" />
						</div>
					)}
				</ImageGrid>
		</div> : ''}
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
			text: data?.text
		})}
  >
    <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
			<PostContent/>
			<SimpleForm sx={{ maxWidth: 500 }} ml={{ xs: 0, sm: "0.5em" }}>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1}>
						<Labeled>
							<TextField source="name" label="Название" />
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
				<CpmTags/>
			</SimpleForm>
		</Box>
  </Edit>
);
