import React, { useState } from "react";
import { Pagination } from "../../../Shared/Pagination/Pagination";
import { IconPlus} from "@tabler/icons-react";
import { Button } from "../../../Shared/Button/Button";
import { useOutletContext, useParams } from "react-router-dom";
import { useCampaignById } from '../../../../hooks/useCampaignById';
import { usePostsByCampaign } from '../../../../hooks/usePostsByCampaign';
import { Tabs } from '../../../Shared/Tabs/Tabs';
import { CPMTable } from "./CPMTable";
import { DefaultTable } from "./DefaultTable";
import { CPMInfo } from "./CPMInfo";
import { DefaultInfo } from "./DefaultInfo";
import s from "./advertising-company.module.scss";
import { Formik } from "formik";
import { useAddModeratePost } from '../../../../hooks/useAddModeratePost';

export const AdvertisingCompany = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [tab, setTab] = useState(0);
	const {companyId} = useParams()
	
	const { data: company } = useCampaignById(companyId);

	const tabs = [
		{label: 'Новые', count: company?.notModeratedPostsCount, value: 'NOT_MODERATED', id: 0},
		{label: 'Активные', count: company?.activePostsCount, value: 'ACCEPTED', id: 1},
		{label: 'На проверке', count: company?.moderatingPostsCount, value: 'MODERATING', id: 2},
		{label: 'Отклоненные', count: company?.declinedPostsCount, value: 'DECLINED', id: 3},
		{label: 'Архивные', count: company?.archivedPostsCount, value: 'ARCHIVED', id: 4}
	]

  const { data: posts, isFetched } = usePostsByCampaign(companyId, {
		status: company?.type === 'FIXED_CPM' ? '' : tabs[tab].value,
		_start: (page - 1) * 30,
    _end: page * 30,
	});
	const {mutate: moderate} = useAddModeratePost()

  const [setModal] = useOutletContext();

  return (
    <div className={s.grid}>
      {company?.type === 'FIXED_CPM' ? <CPMInfo {...{company}}/> : <DefaultInfo {...{company}}/>}
      <Formik
        initialValues={{
          checkboxes: [],
        }}
      >
				{({values, setFieldValue}) => (
					<div className={s.tableCard}>
						<div className={s.filters}>
							<span className={s.title}>
							Рекламные записи  
							</span>
							<Button
								label="Создать запись"
								leftIcon={<IconPlus size={20} />}
								className={s.addBtn}
								size="small"
								onClick={() => {
									setModal("add-post", {campaignId: company?.id});
								}}
							/>
						</div>
						{values.checkboxes.length > 0 ? 
						<div className={s.actions}>
								<Button
									label={"Отправить на модерацию"}
									size="small"
									theme="secondary"
									onClick={(event) => {
										values.checkboxes.forEach(el => {
											moderate({id: el, data: {moderationComment: ''}})
										})
										setFieldValue('checkboxes', [])
									}}
								/>
						</div>
						: 
						<>
							{company?.type === 'FIXED_CPM' ? '' :  <div className={s.tabsWrapper}>
								<Tabs {...{tab, setTab, tabs}}/>
							</div>}
						</>
						}
						<div className={s.tableWrapper}>
							{company?.type === 'FIXED_CPM' ? <CPMTable {...{posts, isFetched}}/> : <DefaultTable {...{posts, isFetched, tabs, tab}}/>}
						</div>
						{posts?.headers["x-total-count"] && (
							<Pagination
								currentPage={page}
								totalCount={+posts?.headers["x-total-count"]}
								pageSize={size}
								setSize={setSize}
								onPageChange={(page) => setPage(page)}
							/>
						)}
					</div>
				)}
			</Formik>
    </div>
  );
};
