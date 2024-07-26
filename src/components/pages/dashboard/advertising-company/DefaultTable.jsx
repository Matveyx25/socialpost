import React from "react";
import s from "./advertising-company.module.scss";
import { Button } from "../../../Shared/Button/Button";
import { Loader } from "../../../Shared/Loader/Loader";
import { useNavigate, useOutletContext } from "react-router-dom";
import classNames from "classnames";

export const DefaultTable = ({ isFetched, posts }) => {
  const navigate = useNavigate();
  const [setModal] = useOutletContext();

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Название записи</th>
          <th>Тип</th>
          <th>Текущие заявки</th>
          <th>Выполненные заявки</th>
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
                <div className={s.center}>
                  {
                    {
                      NEW_POST: "Новая запись",
                      REPOST: "Репост",
                    }[el.type]
                  }
                </div>
              </td>
              <td>
                <div className={s.center}>
                  {el.activeRequestsCount
                    ? el.activeRequestsCount + "/" + el.moneyBlocked + "₽"
                    : "-"}
                </div>
              </td>
              <td>
                <div className={s.center}>
                  {el.completedRequestsCount ? el.completedRequestsCount : "-"}
                </div>
              </td>
              <td>
                <div className={classNames(s.center, s[el.status])}>
                  {
                    {
                      ACTIVE: "Активная",
                      COMPLETED: "Завершенная",
                    }[el.status]
                  }
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
                          label={"Разместить запись"}
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
};
