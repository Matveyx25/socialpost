import React from "react";
import s from "./advertising-company.module.scss";
import { Button } from "../../../Shared/Button/Button";
import { Loader } from "../../../Shared/Loader/Loader";
import { useNavigate, useOutletContext } from "react-router-dom";
import classNames from "classnames";
import { CheckedAll } from '../../../Shared/CheckedAll/CheckedAll';
import { Field } from "formik";
import { CheckboxField } from "../../../Shared/CheckboxField/CheckboxField";

export const DefaultTable = ({ isFetched, posts, tab, tabs }) => {
  const navigate = useNavigate();
  const [setModal] = useOutletContext();

  return (
    <table className={s.table}>
      <thead>
        <tr>
				{tabs[tab].value === "NOT_MODERATED" ? (
						<th className={s.checkTh}>
							<CheckedAll
								name={"checkboxes"}
								ids={posts?.data.map((el) => el.id)}
							/>
						</th>
					) : null}
          <th className={s.th1}>Название записи</th>
          <th className={s.th2}>Тип</th>
          <th className={s.th3}>Текущие заявки</th>
          <th className={s.th4}>Выполненные заявки</th>
          <th className={s.th5}></th>
        </tr>
      </thead>
      <tbody>
        {isFetched ? (
          posts?.data.map((el) => (
            <tr key={el.id}>
							{tabs[tab].value === "NOT_MODERATED" ? (
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
							) : null}
              <td className={s.td1}  onClick={() => navigate("./" + el.id)}>
                <div className={s.center}>{el?.name}</div>
              </td>
              <td className={s.td2}  onClick={() => navigate("./" + el.id)}>
                <div className={s.center}>
                  {
                    {
                      NEW_POST: "Новая запись",
                      REPOST: "Репост",
                    }[el.type]
                  }
                </div>
              </td>
              <td className={s.td3}  onClick={() => navigate("./" + el.id)}>
                <div className={s.center}>
                  {el.activeRequestsCount
                    ? el.activeRequestsCount + "/" + el.moneyBlocked + "₽"
                    : "-"}
                </div>
              </td>
              <td className={s.td4}  onClick={() => navigate("./" + el.id)}>
                <div className={s.center}>
                  {el.completedRequestsCount ? el.completedRequestsCount : "-"}
                </div>
              </td>
              <td className={s.td5}  onClick={() => navigate("./" + el.id)}>
                <div className={classNames(s.center, s[el.status])}>
                  {
                    {
                      ACTIVE: "Активная",
                      COMPLETED: "Завершенная",
                    }[el.status]
                  }
                </div>
              </td>
              <td className={s.td6}  onClick={() => navigate("./" + el.id)}>
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
