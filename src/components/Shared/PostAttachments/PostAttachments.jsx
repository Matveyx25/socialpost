import React from 'react'
import s from './PostAttachments.module.scss'
import { ImageGrid } from 'react-fb-image-video-grid/dist/react-fb-image-video-grid.cjs.production.min'

export const PostAttachments = ({attachments}) => {
	if(!attachments?.length){
		return null
	}

	return (
			<div className={s.preview}>
				<ImageGrid showModal={false}>
					{attachments?.map((img) => (
						<a href={img.fileUrl} target="_blank">
							<img src={img.thumbnailUrl} alt="" />
						</a>
					))}
				</ImageGrid>
			</div>
	)
}
