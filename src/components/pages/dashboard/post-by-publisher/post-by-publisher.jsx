import React, { useState } from "react";
import { DashboardCard } from "../dashboard-card";
import { Button } from "../../../Shared/Button/Button";
import { useParams } from "react-router-dom";
import s from "./post-by-publisher.module.scss";
import { usePauseCPM } from "../../../../hooks/usePauseCPM";
import { PostContent } from "../../../Shared/PostContent/PostContent";
import { usePublishersCPMChannels } from "../../../../hooks/usePublishersCPMChannels";
import { usePublishersCPMById } from "../../../../hooks/usePublishersCPMById";
import { Loader } from "../../../Shared/Loader/Loader";
import { Pagination } from "../../../Shared/Pagination/Pagination";
import { IconPlus } from "@tabler/icons-react";
import { CheckedAll } from "../../../Shared/CheckedAll/CheckedAll";
import { Field, Formik } from "formik";
import { CheckboxField } from "../../../Shared/CheckboxField/CheckboxField";
import { usePublishCPM } from '../../../../hooks/usePublishCPM';
import { PostAttachments } from "../../../Shared/PostAttachments/PostAttachments";

export const PostByPublisher = () => {
  const { postId } = useParams();

  const { data: post } = usePublishersCPMById(postId);
  const { mutate: start } = usePublishCPM();
  const { mutate: pause } = usePauseCPM();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);

  const { data: channels, isFetched } = usePublishersCPMChannels(postId, {
    _start: (page - 1) * 30,
    _end: page * 30,
  });

  return (
    <div className={s.grid}>
      <div className={s.colSm}>
        <DashboardCard>
          <div className={s.cardHeader}>{post?.name}</div>
          <div className={s.line}></div>
					<PostAttachments attachments={post?.uploads}/>
          <PostContent text={post?.text} />
        </DashboardCard>
      </div>
      <div className={s.colLg}>
        <DashboardCard className={s.card}>
          <div className={s.cardHeader}>Информация</div>
          <div className={s.line}></div>
          <div className={s.info}>
            <div>
              <p>Сроки</p>
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
              <p>Ставка СРМ</p>
              <span>{post?.cpmValue}</span>
            </div>
            <div>
              <p>Всего показов</p>
              <span>{post?.cpmViews}</span>
            </div>
            <div>
              <p>Оставшиеся показы</p>
              <span>{post?.cpmChannelPostsLimit - post?.cpmViews}</span>
            </div>
            <div>
              <p>Участники</p>
              {/* <span>{post?.cpmTags.join(", ")}</span> */}
            </div>
          </div>
        </DashboardCard>
        <div className={s.tableCard}>
          <Formik
            initialValues={{
              checkboxes: [],
            }}
          >
            {({ values, setFieldValue }) => (
              <>
                <div className={s.cardHeader}>
                  <span>Каналы для размещения кампании</span>
                </div>
                <div className={s.line}></div>
								{values.checkboxes?.length > 0 ?
								<div className={s.actions}>
									<Button
											size="small"
											theme="secondary"
											rightIcon={<IconPlus size={20}/>}
											label={"Разместить в выбранных"}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												values.checkboxes.forEach(el => {
													start({id: postId, channel_id: el})
												})
												setFieldValue("checkboxes", []);
											}}
										/>
								</div> : <></>}
                <div className={s.tableWrapper}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th className={s.checkTh}>
                          <CheckedAll
                            name={"checkboxes"}
                            ids={channels?.data.map((el) => el.channelId)}
                          />
                        </th>
                        <th className={s.th1}>Название канала</th>
                        <th className={s.th2}>Кол-во показов</th>
                        <th className={s.th3}>Активных записей</th>
                        <th className={s.th4}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {isFetched ? (
                        channels?.headers["x-total-count"] > 0 ? (
                          channels?.data.map((el) => (
                            <tr key={el.id}>
                              <td className={s.checkTd}>
                                <Field
                                  name="checkboxes"
                                  type="checkbox"
                                  component={({ field, form }) => (
                                    <CheckboxField
                                      {...{ field, form }}
                                      initValue={el.channelId}
                                    />
                                  )}
                                />
                              </td>
                              <td className={s.td1}>
                                <div className={s.center}>
                                  <div className={s.mainInfo}>
                                    <div className={s.img}>
                                      <img
                                        src={
                                          el?.channelImageUrl
                                            ? el?.channelImageUrl
                                            : "/images/channel-without-image.svg"
                                        }
                                        alt=""
                                      />
                                    </div>
                                    {el.channelName}
                                  </div>
                                </div>
                              </td>
                              <td className={s.td2}>
                                <div className={s.center}>{el?.views}</div>
                              </td>
                              <td className={s.td3}>
                                <div className={s.center}>
                                  {el?.activePostsCount}
                                </div>
                              </td>
                              <td className={s.td4}>
                                <div className={s.end}>
                                  <Button
                                    label={"Разместить"}
                                    rightIcon={<IconPlus size={20} />}
                                    size="small"
                                    onClick={(event) => {
                                      event.stopPropagation();
																			start({id: postId, channel_id: el.channelId})
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className={s.emptyMessage}>
                            Подходящих каналов пока нет
                          </div>
                        )
                      ) : (
                        <Loader />
                      )}
                    </tbody>
                  </table>
                </div>
                {channels?.headers["x-total-count"] && (
                  <Pagination
                    currentPage={page}
                    totalCount={+channels?.headers["x-total-count"]}
                    pageSize={size}
                    setSize={setSize}
                    onPageChange={(page) => setPage(page)}
                  />
                )}
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
