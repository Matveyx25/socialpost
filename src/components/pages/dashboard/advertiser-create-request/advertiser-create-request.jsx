import React, { useState } from "react";
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
import { useChannelsCanPublishIn } from '../../../../hooks/useChannelsCanPublishIn';

export const AdvertiserCreateRequest = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const { postId } = useParams();
  const [filters, setFilters] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [timeRange, setTimeRange] = useState([null, null]);

  const { data: channels, isFetched, refetch } = useChannels({ ...filters });
  const { mutate: createRequest } = useAddPostRequest();

	const {data: canPublishIds } = useChannelsCanPublishIn(channels?.data?.map(el => el.id))

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

  const request = (id) => {
		const startTime = new Date(timeRange[0]);
		const endTime = new Date(timeRange[1]);

		const formatTime = (time) => {
			const hours = String(time.getHours()).padStart(2, '0'); // Pad single digit hours with leading zero
			const minutes = String(time.getMinutes()).padStart(2, '0'); // Pad single digit minutes with leading zero
			return `${hours}:${minutes}`;
		};
	
		const publishStartTime = formatTime(startTime);
		const publishEndTime = formatTime(endTime);

    createRequest({
      id: postId,
      data: {
        channelId: id,
        publishStartDate: new Date(dateRange[0]).toISOString()?.slice(0, 10),
        publishEndDate: new Date(dateRange[1]).toISOString()?.slice(0, 10),
				publishStartTime,
				publishEndTime
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
									{/* "Общая стоимость" / "Общий охват" * 1000. */}
                  {(+priceSeparator(channels?.headers["x-price-sum"]) / +priceSeparator(channels?.headers["x-reach-sum"]) * 1000) || 0}
                </div>
                <div className={s.infoLabel}>Средний CPM</div>
              </div>
            </div>
            <div className={s.btns}>
              <Button label={"Разместить во всех"} />
            </div>
          </div>
        </DashboardCard>
        <div className={s.tableCard}>
          <div className={s.cardHeader}>
            <span>Каналы</span>
          </div>
          <div className={s.line}></div>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
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
                        <div className={s.center}>{el.subscribersCount}</div>
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
                          {canPublishIds && <Button
                            size="small"
                            theme="secondary"
														disabled={!canPublishIds[index]}
                            label={"Разместить"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              request(el.id);
                            }}
                          />}
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
