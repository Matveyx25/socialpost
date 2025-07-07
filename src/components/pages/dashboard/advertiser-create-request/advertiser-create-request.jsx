import { useEffect, useState } from "react";
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
import { usePost } from '../../../../hooks/usePost';
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";
import Dropdown from 'react-dropdown';
import { useAllDurations } from "../../../../hooks/durations";
import { transformDuration } from '../../../../helpers/transformDuratuin';

function removeNullAttributes(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export const AdvertiserCreateRequest = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const { postId } = useParams();
  const [dateRange, setDateRange] = useState([null, null]);
  const [timeRange, setTimeRange] = useState(["00:00", "00:00"]);
	const {data: post} = usePost(postId)
	const {data: durations} = useAllDurations()

  const [selectedFormat, setSelectedFormat] = useState();
  const [channelSelectedFormat, setChannelSelectedFormat] = useState([]);

	const [filters, setFilters] = useState(null);
	
  const { data: channels, isFetched, refetch } = useChannels({ ...filters, price_type: post?.campaignType });
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
			durations_ids: selectedFormat?.value
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
				durationId: selectedFormat?.value
      });
    }
  };

  const request = (id, durationId) => {
    createRequest({
      id: postId,
      data: {
        channelId: id,
        publishStartDate: formatToISO(dateRange[0])?.slice(0, 10),
        publishEndDate: formatToISO(dateRange[1])?.slice(0, 10),
        publishStartTime: timeRange[0],
        publishEndTime: timeRange[1],
				durationId
      },
    });
  };

	const disabled =  !dateRange[0] ||
	!dateRange[1] ||
	!timeRange[0] ||
	!timeRange[1] || 
	+(timeRange[0].replace(':', '')) > +(timeRange[1].replace(':', '')) || !selectedFormat

  return (
    <div className={s.grid}>
      <div className={s.colSm}>
        <DashboardCard>
          <Filters
            onFilterSubmit={onFilterSubmit}
            maxSubscribersNumber={100000}
            {...{ dateRange, setDateRange, timeRange, setTimeRange, durations, selectedFormat, setSelectedFormat }}
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
														request(el, channelSelectedFormat?.find(_ => _.id === el)?.value)
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
                          <Channel {...{el, index, disabled, request, setChannelSelectedFormat, channelSelectedFormat}} formatId={selectedFormat ? selectedFormat.value : null}/>
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


const Channel = ({el, index, disabled, request, formatId = 2, setChannelSelectedFormat, channelSelectedFormat}) => {
	const prices = el?.prices?.map((el) => ({
		enabled: true,
		label: `${transformDuration(el?.duration)} - ${priceSeparator(el.price)}руб.`,
		value: el.duration.id,
		price: el.price,
	}));

	const formats = el ? [
		{enabled: el?.nativePostPriceEnabled, label: `Нативный - ${priceSeparator(el?.nativePostPrice)}руб.`, value: null, price: el?.nativePostPrice},
		...prices
	] : []
	
	const [defaultFormat] = useState(formatId ? (formats?.find(_ => _.value === formatId) || null) : null)

	const [selectedFormat, setSelectedFormat] = useState(
		defaultFormat ? { value: defaultFormat?.value, label: defaultFormat?.label } :
		{ value: formats[0]?.value, label: formats[0]?.label }
	);

	useEffect(() => {
		if(!channelSelectedFormat?.find(_ => _.id === el.id) && formats){
			setChannelSelectedFormat(prev =>  prev?.length ? [...prev, {id: el.id, value: defaultFormat ? defaultFormat?.value : formats[0]?.value}] : [{id: el.id, value: defaultFormat ? defaultFormat?.value : formats[0]?.value}])
		}
	}, [defaultFormat, formats])
	
	const update = (v) => {
		setSelectedFormat(v)
		setChannelSelectedFormat(prev => {
			if(prev.find(_ => _.id === el.id)){
				return prev.map(_ => {
					if(_.id === el.id){
						return {id: el.id, value: v.value}
					}
					return _
				})
			}
			return prev?.length ? [...prev, {id: el.id, value: v.value}] : [{id: el.id, value: v.value}]
		})
	}

	return (
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
							<Dropdown
								value={selectedFormat}
								options={formats.map((_) => ({
									value: _.value,
									label: _.label,
								}))}
								className={s.formats}
								onChange={update}
								arrowClosed={<IconChevronDown size={18} />}
								arrowOpen={<IconChevronUp size={18} />}
							/>
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
								request(el.id, selectedFormat?.value);
							}}
						/>
				</div>
			</td>
		</tr>
	)
}