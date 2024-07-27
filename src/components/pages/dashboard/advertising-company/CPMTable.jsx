import React from 'react'
import s from './advertising-company.module.scss'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../../../Shared/Button/Button';
import { Loader } from '../../../Shared/Loader/Loader';
import { useStartCPM } from '../../../../hooks/useStartCPM';
import { useStopCPM } from '../../../../hooks/useStopCPM';
import { usePauseCPM } from '../../../../hooks/usePauseCPM';
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

export const CPMTable = ({isFetched, posts}) => {
	const navigate = useNavigate();
  const [setModal] = useOutletContext();

	const {mutate: start} = useStartCPM()
	const {mutate: pause} = usePauseCPM()

  return (
    <table className={s.cpmTable}>
      <thead>
        <tr>
          <th>Название кампании</th>
          <th>Лимит показов</th>
          <th>Показов сейчас</th>
          <th>Лимит бюджета</th>
          <th>CPM</th>
          <th>Потрачено</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {isFetched ? (
          posts?.data.map((el) => (
            <tr key={el.id} onClick={() => navigate("./" + el.id)}>
              <td>
                <div className={s.center}>{el?.name}</div>
              </td>
              <td>
                <div className={s.center}>{el?.cpmChannelPostsLimit}</div>
              </td>
              <td>
                <div className={s.center}>{el?.cpmViews}</div>
              </td>
              <td>
                <div className={s.center}>{el?.cpmBudget}</div>
              </td>
              <td>
                <div className={s.center}>{el?.cpmValue}</div>
              </td>
              <td>
                <div className={s.center}>
                  {el.totalMoneySpent
                    ? el.totalMoneySpent + "₽"
                    : "-"}
                </div>
              </td>
              <td>
                <div className={s.end}>
                  {
										el?.status === 'NOT_MODERATED' ? 
											<Button
												label={"Отправить на модерацию"}
												size="small"
												theme="secondary"
												onClick={(event) => {
													event.stopPropagation();
													setModal("add-post-to-moderation", {
														postId: el.id,
													});
												}}
											/> : 
										el?.status === 'ACCEPTED' ? 
											<div className={s.btns}>
												<Button label={<IconPlayerPlayFilled size={18} style={{'margin-top': 3}}/>}
													size="small"
													disabled={el?.cpmStatus === 'ACTIVE'}
													className={el?.cpmStatus === 'ACTIVE' ? s.active : ''}
													theme={'secondary'}
													onClick={(event) => {
														event.stopPropagation();
														start(el.id)
													}}/> 
												<Button label={<IconPlayerPauseFilled size={18} style={{'margin-top': 3}}/>}
													size="small"
													disabled={el?.cpmStatus === 'PAUSED'}
													className={el?.cpmStatus === 'PAUSED' ? s.active : ''}
													theme={'secondary'}
													onClick={(event) => {
														event.stopPropagation();
														pause(el.id)
													}}/> 
												<Button label={<IconX color={'#EE1F1F'} size={18} style={{'margin-top': 3}}/>}
													size="small"
													theme="secondary"
													onClick={(event) => {
														event.stopPropagation();
														setModal('stop-cpm', {postId: el.id})
													}}/> 
											</div>
										: null
									}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <Loader />
        )}
      </tbody>
    </table>
  );
}
