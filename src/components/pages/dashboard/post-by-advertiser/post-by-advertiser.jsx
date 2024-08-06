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

import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { priceSeparator } from "../../../../helpers/priceSeparator";
import { useStartCPM } from "../../../../hooks/useStartCPM";
import { usePauseCPM } from "../../../../hooks/usePauseCPM";
import { DefaultRequests } from "./DefaultRequests";
import { CPMRequests } from "./CPMRequests";
import { Dropdown } from '../../../Shared/Dropdown/Dropdown';
import { IconPlayerStopFilled } from "@tabler/icons-react";

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
						<Button label={'Редактировать'} onClick={() => setModal('edit-post-modal', {editPostId: postId})} theme="secondary" size="small"/>
					</div>
          <div className={s.line}></div>
          {post?.uploads.length ? (
            <div className={s.preview}>
              <ImageGrid showModal={false}>
                {post?.uploads?.map((img) => (
                  <div>
                    <img src={img.thumbnailUrl} alt="" />
                  </div>
                ))}
              </ImageGrid>
            </div>
          ) : (
            ""
          )}
          <div className={s.content}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
            >
              {post?.content}
            </Markdown>
          </div>
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
															label={
																{
																	ACTIVE: 
																		<div className={s.statusItem}>
																			<IconPlayerPlayFilled
																				size={18}
																			/>
																			Показы запущенны
																		</div>,
																	PAUSED: 
																		<div className={s.statusItem}>
																			<IconPlayerPauseFilled
																				size={18}
																			/>
																			Показы приостановлены
																		</div>,
																	STOPPED: 
																		<div className={s.statusItem}>
																			<IconPlayerStopFilled
																				size={18}
																			/>
																			Показы завершены
																		</div>,
																	INACTIVE: <div className={s.statusItem}>Показы не запущенны</div>,
																}[post?.cpmStatus]
															}
															options={[
																<div
																	className={s.statusButton}
																	onClick={(event) => {
																		event.stopPropagation();
																		start(post.id);
																	}}
																>
																	<IconPlayerPlayFilled
																		size={18}
																	/>
																	Запустить показы
																</div>,
																<div
																	className={s.statusButton}
																	onClick={(event) => {
																		event.stopPropagation();
																		pause(post.id);
																	}}
																>
																	<IconPlayerPauseFilled
																		size={18}
																	/>
																	Приостановить показы
																</div>,
																<div
																	className={s.statusButton}
																	onClick={(event) => {
																		event.stopPropagation();
																		setModal("stop-cpm", { postId: post.id });
																	}}
																>
																	<IconPlayerStopFilled
																		size={18}
																	/>
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
