import { useState } from "react";
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
import { useAddPostAllRequests } from "../../../../hooks/useAddPostAllRequests";
import { Field, Form, Formik } from "formik";
import { CheckedAll } from "../../../Shared/CheckedAll/CheckedAll";
import { CheckboxField } from "../../../Shared/CheckboxField/CheckboxField";
import { formatToISO } from "../../../../helpers/formatToISO";

export const AdvertiserCreateRequest = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const { postId } = useParams();
  const [filters, setFilters] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [timeRange, setTimeRange] = useState(["00:00", "00:00"]);
	
  const { data: channels, isFetched, refetch } = useChannels({ ...filters });
  const { mutate: createRequest } = useAddPostRequest();
  const { mutate: createRequestsAll } = useAddPostAllRequests();

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

  const onSubmitRequestToAll = () => {
    if (dateRange[0] && dateRange[1] && timeRange[0] && timeRange[1]) {
      createRequestsAll({
        ...filters,
        post_id: postId,
        publish_start_time: timeRange[0],
        publish_end_time: timeRange[1],
        publish_start_date: formatToISO(dateRange[0])?.slice(0, 10),
        publish_end_date: formatToISO(dateRange[1])?.slice(0, 10),
      });
    }
  };

  const request = (id) => {
    createRequest({
      id: postId,
      data: {
        channelId: id,
        publishStartDate: formatToISO(dateRange[0])?.slice(0, 10),
        publishEndDate: formatToISO(dateRange[1])?.slice(0, 10),
        publishStartTime: timeRange[0],
        publishEndTime: timeRange[1],
      },
    });
  };

	const disabled =  !dateRange[0] ||
	!dateRange[1] ||
	!timeRange[0] ||
	!timeRange[1] || 
	+(timeRange[0].replace(':', '')) > +(timeRange[1].replace(':', ''))

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
                  {(1 / (+channels?.headers["x-price-sum"] /
                    +channels?.headers["x-reach-sum"]) *
                    1000) || 0}
                </div>
                <div className={s.infoLabel}>Средний CPM</div>
              </div>
            </div>
            <div className={s.btns}>
              <Button
                label={"Разместить во всех"}
                className={s.allBtn}
                onClick={onSubmitRequestToAll}
                disabled={disabled}
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
          >
            {({ values, setFieldValue }) => (
              <Form>
								{values.checkboxes?.length > 0 &&
									<div className={s.actions}>
										<Button
												size="small"
												theme="secondary"
												label={"Разместить в выбранных"}
												disabled={disabled}
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													values.checkboxes.forEach(el => {
														request(el)
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
                         <CheckedAll name={'checkboxes'} ids={channels?.data?.map(el => el.id)}/>
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
                                  <Button
                                    size="small"
                                    theme="secondary"
                                    label={"Разместить"}
																		disabled={disabled}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      request(el.id);
                                    }}
                                  />
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
