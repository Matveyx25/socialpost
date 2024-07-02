import { Box } from "@mui/material";
import DOMPurify from "dompurify";
import * as React from "react";
import { Edit, SimpleForm, TextField, TopToolbar, PrevNextButtons, Labeled, FunctionField, SelectInput, TextInput, useRecordContext } from "react-admin";
import { ImageGrid } from 'react-fb-image-video-grid';
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import s from './style.module.scss'

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
				{DOMPurify.sanitize(post?.content)}
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
			content: data?.content
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
									{ id: "NOT_MODERATED", name: "Активный" },
									{ id: "MODERATING", name: "На проверке" },
									{ id: "DECLINED", name: "Отклоненный" },
									{ id: "ACCEPTED", name: "Архивный" },
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
			</SimpleForm>
		</Box>
  </Edit>
);