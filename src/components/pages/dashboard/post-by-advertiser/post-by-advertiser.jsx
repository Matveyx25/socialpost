import React from "react";
import { DashboardCard } from "../dashboard-card";
import { Button } from "../../../Shared/Button/Button";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import s from "./post-by-advertiser.module.scss";
import { usePost } from "../../../../hooks/usePost";
import { ImageGrid } from "react-fb-image-video-grid";
import {
  IconAlertTriangle,
  IconClockHour4,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

import { priceSeparator } from "../../../../helpers/priceSeparator";
import { useStartCPM } from "../../../../hooks/useStartCPM";
import { usePauseCPM } from "../../../../hooks/usePauseCPM";
import { DefaultRequests } from "./DefaultRequests";
import { CPMRequests } from "./CPMRequests";
import { Dropdown } from '../../../Shared/Dropdown/Dropdown';
import { IconPlayerStopFilled } from "@tabler/icons-react";
import { PostContent } from "../../../Shared/PostContent/PostContent";
import classNames from "classnames";

export const PostByAdvertiser = () => {
  const [setModal] = useOutletContext();
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post } = usePost(postId);
  const { mutate: start } = useStartCPM();
  const { mutate: pause } = usePauseCPM();

  return (
    <div className={s.grid}>
      <div className={s.colSm}>
        <DashboardCard>
          <div className={s.cardHeader}>{post?.name}
						{post?.status !== 'MODERATING' && <Button label={'Редактировать'} onClick={() => setModal('edit-post-modal', {editPostId: postId})} theme="secondary" size="small"/>}
					</div>
          <div className={s.line}></div>
          {post?.uploads.length ? (
            <div className={s.preview}>
              <ImageGrid showModal={false}>
                {post?.uploads?.map((img) => (
                  <a href={img.fileUrl} target="_blank">
                    <img src={img.thumbnailUrl} alt="" />
                  </a>
                ))}
              </ImageGrid>
            </div>
          ) : (
            ""
          )}
           <PostContent text={post?.text}/>
        </DashboardCard>
      </div>
      <div className={s.colLg}>
        {
          {
            NOT_MODERATED: null,
            MODERATING: (
              <DashboardCard className={s.card}>
                <div className={s.alertWrapper}>
                  <IconClockHour4 color="#436CFF" size={24} />
                  <div className={s.alertContent}>
                    <div className={s.alertTitle}>
                      Рекламная запись на модерации
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ),
            DECLINED: (
              <DashboardCard className={s.card}>
                <div className={s.alertWrapper}>
                  <IconAlertTriangle color="#F46262" size={24} />
                  <div className={s.alertContent}>
                    <div className={s.alertTitle}>
                      Рекламная запись не прошла модерацию
                    </div>
                    <div className={s.alertText}>{post?.declineReason}</div>
                  </div>
                </div>
              </DashboardCard>
            ),
            ACCEPTED: null,
          }[post?.status]
        }
        <DashboardCard className={s.card}>
          <div className={s.cardHeader}>
            Информация
            <div className={s.btns}>
						{post?.cpmStatus ?  <Button
                      label={"Редактировать"}
                      size="small"
                      onClick={() => {
                        setModal("edit-post-cpm-modal", { editCpmPostId: postId });
                      }}
                    /> : null}
              {
                {
                  NOT_MODERATED: (
                    <Button
                      label={"Отправить на модерацию"}
                      size="small"
                      onClick={() => {
                        setModal("add-post-to-moderation", { postId });
                      }}
                    />
                  ),
                  MODERATING: null,
                  DECLINED: (
                    <Button
                      label={"Отправить на модерацию"}
                      size="small"
                      onClick={() => {
                        setModal("add-post-to-moderation", { postId });
                      }}
                    />
                  ),
                  ACCEPTED: (
                    <>
                      {post?.cpmStatus ? (
                         <div className={s.btns}>
													<Dropdown
														className={s.dropdown}
														menuClassName={s.menu}
														disableArrows
														label={
															{
																ACTIVE: (
																	<div className={classNames(s.statusItem, s.play)}>
																		<IconPlayerPlayFilled size={18}/>
																		Показы запущенны
																	</div>
																),
																PAUSED: (
																	<div className={classNames(s.statusItem, s.pause)}>
																		<IconPlayerPauseFilled size={18}/>
																		Показы приостановлены
																	</div>
																),
																STOPPED: (
																	<div className={classNames(s.statusItem, s.stop)}>
																		<IconPlayerStopFilled size={18}/>
																		Показы завершены
																	</div>
																),
																INACTIVE: (
																	<div className={s.statusItem}>
																		Показы не запущенны
																	</div>
																),
															}[post?.cpmStatus]
														}
														options={[
															<div
																className={classNames(s.statusButton, s.play)}
																onClick={(event) => {
																	event.stopPropagation();
																	start(post.id);
																}}
															>
																<IconPlayerPlayFilled size={18}/>
																Запустить показы
															</div>,
															<div
																className={classNames(s.statusButton, s.pause)}
																onClick={(event) => {
																	event.stopPropagation();
																	pause(post.id);
																}}
															>
																<IconPlayerPauseFilled size={18}/>
																Приостановить показы
															</div>,
															<div
																className={classNames(s.statusButton, s.stop)}
																onClick={(event) => {
																	event.stopPropagation();
																	setModal("stop-cpm", { postId: post.id });
																}}
															>
																<IconPlayerStopFilled size={18}/>
																Завершить показы
															</div>,
														]}
													/>
												</div>
                      ) : (
                        <Button
                          label={"Разместить пост"}
                          size="small"
                          onClick={() => navigate("./create-request")}
                        />
                      )}
                    </>
                  ),
                }[post?.status]
              }
            </div>
          </div>
          <div className={s.line}></div>
          <div className={s.info}>
            <div>
              <p>Название записи</p>
              <span>{post?.name}</span>
            </div>
            {post?.cpmStatus ? (
              <>
                <div>
                  <p>Тематика каналов</p>
                  <span>{post?.cpmTags.join(", ")}</span>
                </div>
                <div>
                  <p>Период размещения</p>
                  <span>
                    {new Date(post?.cpmStartDate).toLocaleDateString("ru-RU", {
                      formatMatcher: "basic",
                    }) +
                      " - " +
                      new Date(post?.cpmEndDate).toLocaleDateString("ru-RU", {
                        formatMatcher: "basic",
                      })}
                  </span>
                </div>
                <div>
                  <p>CPM</p>
                  <span>{priceSeparator(post?.cpmValue)}₽</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p>Всего заявок</p>
                  <span>{post?.totalRequestsCount}</span>
                </div>
                <div>
                  <p>Активных заявок</p>
                  <span>{post?.activeRequestsCount}</span>
                </div>
                <div>
                  <p>Выполненных заявок</p>
                  <span>{post?.completedRequestsCount}</span>
                </div>
              </>
            )}
            <div>
              <p>Маркировка рекламы</p>
              <span>
                {
                  {
                    NONE: "Отсутствует",
                    IN_TEXT: "В тексте записи",
                    IN_VIDEO: "В видео",
                    IN_PHOTO: "На фотографиях",
                  }[post?.markingType]
                }
              </span>
            </div>
          </div>
          {post?.cpmStatus ? (
            <div className={s.info}>
              <div>
                <p>Всего показов</p>
                <span>{post?.cpmViews}</span>
              </div>
              <div>
                <p>Лимит трат</p>
                <span>{post?.cpmChannelPostsLimit}₽</span>
              </div>
              <div>
                <p>Потрачено</p>
                <span>{post?.totalMoneySpent}₽</span>
              </div>
            </div>
          ) : (
            <div className={s.info}>
              <div>
                <p>Заблокированно</p>
                <span>{post?.moneyBlocked}₽</span>
              </div>
              <div>
                <p>Потрачено</p>
                <span>{post?.totalMoneySpent}₽</span>
              </div>
            </div>
          )}
        </DashboardCard>
				{post?.cpmStatus ? <CPMRequests {...{postId}}/> : <DefaultRequests {...{post, postId}}/>}
      </div>
    </div>
  );
};
