import React from 'react'
import s from './advertising-company.module.scss'
import { useNavigate, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../../../Shared/Button/Button';
import { Loader } from '../../../Shared/Loader/Loader';

export const CPMTable = ({isFetched, posts}) => {
	const navigate = useNavigate();
  const [setModal] = useOutletContext();

  return (
    <table className={s.cpmTable}>
      <thead>
        <tr>
          <th>Название записи</th>
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
                    {
                      NOT_MODERATED: (
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
                        />
                      ),
                      MODERATING: null,
                      DECLINED: (
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
                        />
                      ),
                      ACCEPTED: (
                        <Button
                          label={"Запустить показы"}
                          size="small"
                          theme="secondary"
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate("./" + el.id + "/create-request");
                          }}
                        />
                      ),
                    }[el?.status]
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
