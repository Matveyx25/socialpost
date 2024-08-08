import React from 'react'
import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import s from './PostContent.module.scss'
import slate from '@st.matthew/remark-slate';
import { MDXProvider } from '@mdx-js/react';
import remarkMDX from 'remark-mdx';
import {deserializeToHTML} from '../../../helpers/deserialize'

const mdxOptions = {
  remarkPlugins: [
    remarkMDX,
    deserializeToHTML, // Include your custom plugin here
  ],
};


export const PostContent = ({text}) => {
	return (
		<div className={s.content}>
			<MDXProvider options={mdxOptions}>
				<Markdown
					remarkPlugins={[remarkGfm, deserializeToHTML]}
					rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
				>
					{text}
				</Markdown>
			</MDXProvider>
		</div>
	)
}
