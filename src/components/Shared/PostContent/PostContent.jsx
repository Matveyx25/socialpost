import React from 'react'
import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import s from './PostContent.module.scss'
import {deserializeToHTML} from '../../../helpers/deserialize'
import DOMPurify from 'dompurify'

export const PostContent = ({text}) => {
	return (
		<div className={s.content}>
			<Markdown
				remarkPlugins={[remarkGfm, deserializeToHTML]}
				rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
			>
				{text?.replace(/\n/g, '<br/>')}
			</Markdown>
		</div>
	)
}
