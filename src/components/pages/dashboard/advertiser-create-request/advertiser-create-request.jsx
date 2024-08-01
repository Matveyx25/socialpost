import React, { useEffect, useState } from "react";
import { DashboardCard } from "../dashboard-card";
import { Button } from "../../../Shared/Button/Button";
import { useParams } from "react-router-dom";
import s from "./advertiser-create-request.module.scss";
import { useChannels } from "../../../../hooks/useChannels";
import { useAddPostRequest } from "../../../../hooks/useAddPostRequest";
import { Filters } from "./filter";
import { Loader } from "../../../Shared/Loader/Loader";
import { Pagination } from "../../../Shared/Pagination/Pagination";
import { priceSeparator } from "../../../../helpers/priceSeparator";
import { useChannelsCanPublishIn } from "../../../../hooks/useChannelsCanPublishIn";
import { useAddPostAllRequests } from "../../../../hooks/useAddPostAllRequests";
import {
  IconSquare,
  IconSquareCheckFilled,
  IconSquareMinusFilled,
} from "@tabler/icons-react";
import { Field, Form, Formik } from "formik";

const CheckboxField = ({field, form, initValue}) => {
	return (
			<div className={s.checkWrapper}>
				<label>
					<input {...field} type="checkbox" 
					checked={field.value.find(_ => _ === initValue)}
					onChange={() => {
						if (field.value.find(_ => _ === initValue)) {
							form.setFieldValue(field.name, field.value.filter((_) => _ !== initValue));
						} else {
							form.setFieldValue(field.name, [...field.value, initValue]);
						}
					}}/>
					<span className={s.checkLabel}>
						<IconSquare
							className={s.checkboxIconEmpty}
						/>
						<IconSquareCheckFilled
							className={s.checkboxIconFill}
						/>
					</span>
				</label>
			</div>
	)
}

export const AdvertiserCreateRequest = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const { postId } = useParams();
  const [filters, setFilters] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [timeRange, setTimeRange] = useState([null, null]);
	const [channelsIdsForPublish, setChannelsIdsForPublish] = useState()
	
  const { data: channels, isFetched, refetch } = useChannels({ ...filters });
  const { mutate: createRequest } = useAddPostRequest();
  const { mutate: createRequestsAll } = useAddPostAllRequests();

  const { data: canPublishIds } = useChannelsCanPublishIn(
    channels?.data?.map((el) => el.id)
  );

  const onFilterSubmit = (f) => {
    setFilters({
      subscribers_min: f?.minSubscribers,
      subscribers_max: f?.maxSubscribers,
      average_post_reach_min: f?.minPostReach,
      average_post_reach_max: f?.maxPostReach,
      cost_per_view_min: f?.minCPV,
      cost_per_view_max: f?.maxCPV,
      price_min: f?.minPrice,
      price_max: f?.maxPrice,
      name: f?.search,
    });
    refetch();
  };

	useEffect(() => {
		if(canPublishIds?.length && channels?.data?.length){
			setChannelsIdsForPublish([...channels.data].map((el, i) => {
				if(canPublishIds[i] === true){
					return el.id
				}
			}))
		}
	}, [canPublishIds, channels])

  const onSubmitRequestToAll = () => {
    if (dateRange[0] && dateRange[1] && timeRange[0] && timeRange[1]) {
      createRequestsAll({
        ...filters,
        post_id: postId,
        publish_start_time: timeRange[0],
        publish_end_time: timeRange[1],
        publish_start_date: new Date(dateRange[0]).toISOString()?.slice(0, 10),
        publish_end_date: new Date(dateRange[1]).toISOString()?.slice(0, 10),
      });
    }
  };

  const request = (id) => {
    createRequest({
      id: postId,
      data: {
        channelId: id,
        publishStartDate: new Date(dateRange[0]).toISOString()?.slice(0, 10),
        publishEndDate: new Date(dateRange[1]).toISOString()?.slice(0, 10),
        publishStartTime: timeRange[0],
        publishEndTime: timeRange[1],
      },
    });
  };

  return (
    <div className={s.grid}>
      <div className={s.colSm}>
        <DashboardCard>
          <Filters
            onFilterSubmit={onFilterSubmit}
            maxSubscribersNumber={100000}
            {...{ dateRange, setDateRange, timeRange, setTimeRange }}
          />
        </DashboardCard>
      </div>
      <div className={s.colLg}>
        <DashboardCard className={s.card}>
          <div className={s.cardHeader}>
            <div className={s.infoFlex}>
              <div className={s.infoBlock}>
                <div className={s.infoValue}>
                  {priceSeparator(channels?.headers["x-reach-sum"]) || 0}
                </div>
                <div className={s.infoLabel}>Общий охват</div>
              </div>
              <div className={s.infoBlock}>
                <div className={s.infoValue}>
                  {(priceSeparator(channels?.headers["x-price-sum"]) || 0) +
                    "₽"}
                </div>
                <div className={s.infoLabel}>Общая стоимость</div>
              </div>
              <div className={s.infoBlock}>
                <div className={s.infoValue}>
                  {(+priceSeparator(channels?.headers["x-price-sum"]) /
                    +priceSeparator(channels?.headers["x-reach-sum"])) *
                    1000 || 0}
                </div>
                <div className={s.infoLabel}>Средний CPM</div>
              </div>
            </div>
            <div className={s.btns}>
              <Button
                label={"Разместить во всех"}
                className={s.allBtn}
                onClick={onSubmitRequestToAll}
                disabled={
                  !dateRange[0] ||
                  !dateRange[1] ||
                  !timeRange[0] ||
                  !timeRange[1] ||
                  channelsIdsForPublish?.length <= 0
                }
              />
            </div>
          </div>
        </DashboardCard>
        <div className={s.tableCard}>
          <div className={s.cardHeader}>
            <span>Каналы</span>
          </div>
          <div className={s.line}></div>
          <Formik
            initialValues={{
              checkboxes: [],
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form>
								{values.checkboxes?.length > 0 &&
									<div className={s.actions}>
										<Button
												size="small"
												theme="secondary"
												disabled={values.checkboxes?.findIndex(el => channelsIdsForPublish?.includes(el)) === -1}
												label={"Разместить в выбранных"}
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													values.checkboxes.forEach(el => {
														if(channelsIdsForPublish?.includes(el)){
															request(el)
														}
													})
													setFieldValue("checkboxes", []);
												}}
											/>
									</div>
								}
                <div className={s.tableWrapper}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th className={s.checkTh}>
                          <div className={s.checkWrapper}>
                            <label>
                              <input
                                name="all"
                                type="checkbox"
																checked={values.checkboxes?.length > 0}
                                onChange={() => {
                                  if (values.checkboxes?.length > 0) {
                                    setFieldValue("checkboxes", []);
                                  } else {
                                    setFieldValue(
                                      "checkboxes",
                                      channels?.data.map((el) => el.id)
                                    );
                                  }
                                }}
                              />
                              <span className={s.checkLabel}>
                                <IconSquare className={s.checkboxIconEmpty} />
                                <IconSquareMinusFilled
                                  className={s.checkboxIconFill}
                                />
                              </span>
                            </label>
                          </div>
                        </th>
                        <th>Название канала</th>
                        <th>CPM</th>
                        <th>Подписчики</th>
                        <th>Охват</th>
                        <th>Стоимость</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {isFetched ? (
                        channels?.data.map((el, index) => (
                          <tr key={el.id}>
                            <td className={s.checkTd}>
                              <Field
                                name="checkboxes"
                                type="checkbox"
                                component={({ field, form }) => (
                                  <CheckboxField
                                    {...{ field, form }}
                                    initValue={el.id}
                                  />
                                )}
                              />
                            </td>
                            <td>
                              <div className={s.center}>
                                <div className={s.mainInfo}>
                                  <div className={s.img}>
                                    <img
                                      src={
                                        el?.imageUrl
                                          ? el?.imageUrl
                                          : "/images/channel-without-image.svg"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  {el.name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className={s.center}>
                                {el.costPerView ? el.costPerView + "₽" : "-"}
                              </div>
                            </td>
                            <td>
                              <div className={s.center}>
                                {el.subscribersCount}
                              </div>
                            </td>
                            <td>
                              <div className={s.center}>
                                {el.averagePostReach || "-"}
                              </div>
                            </td>
                            <td>
                              <div className={s.center}>
                                {el.nativePrice || el.basePrice
                                  ? el.nativePrice
                                    ? el.nativePrice + "₽"
                                    : el.basePrice + "₽"
                                  : "-"}
                              </div>
                            </td>
                            <td>
                              <div className={s.end}>
                                {canPublishIds && (
                                  <Button
                                    size="small"
                                    theme="secondary"
                                    disabled={!canPublishIds[index]}
                                    label={"Разместить"}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      request(el.id);
                                    }}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <Loader />
                      )}
                    </tbody>
                  </table>
                </div>
              </Form>
            )}
          </Formik>
          {channels?.headers["x-total-count"] && (
            <Pagination
              currentPage={page}
              totalCount={+channels?.headers["x-total-count"]}
              pageSize={size}
              setSize={setSize}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
