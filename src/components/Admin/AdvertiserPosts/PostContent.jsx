import { useRecordContext } from "react-admin"
import { PostAttachments } from "../../Shared/PostAttachments/PostAttachments"
import s from './style.module.scss'
import { PostContent as PostContentText } from '../../Shared/PostContent/PostContent';

export const PostContent = () => {
	const post = useRecordContext()

	return <div className={s.post}>
		<PostAttachments attachments={post?.uploads}/>
		<PostContentText text={post?.text}/>
	</div>
}