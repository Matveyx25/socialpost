import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'

import { usePost } from "../../hooks/usePost";

import { Button } from "../Shared/Button/Button";
import { PostContent } from '../Shared/PostContent/PostContent';
import { PostAttachments } from "../Shared/PostAttachments/PostAttachments";

export const PostModal = ({ isOpen, setOpen, modalParams }) => {
  const { data: post } = usePost(modalParams?.postId);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={post?.name || `Запись`}
      name={"post-modal"}
    >
			<div className={s.scroller}>
					<div className={s.postContent}>
						<PostAttachments attachments={post?.uploads}/>
						<PostContent text={post?.text}/>
					</div>
				</div>
    </Modal>
  );
};
