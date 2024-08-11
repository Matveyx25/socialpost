import React from 'react'
import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import s from './PostContent.module.scss'
import slate from '@st.matthew/remark-slate';
import {deserializeToHTML} from '../../../helpers/deserialize'


export const PostContent = ({text}) => {
	return (
		<div className={s.content}>
			<Markdown
				remarkPlugins={[remarkGfm, deserializeToHTML]}
				rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
			>
				{text}
			</Markdown>
		</div>
	)
}
