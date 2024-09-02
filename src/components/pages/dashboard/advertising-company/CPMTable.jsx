import React from "react";
import s from "./advertising-company.module.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../../../Shared/Button/Button";
import { Loader } from "../../../Shared/Loader/Loader";
import { useStartCPM } from "../../../../hooks/useStartCPM";
import { usePauseCPM } from "../../../../hooks/usePauseCPM";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { Dropdown } from "../../../Shared/Dropdown/Dropdown";
import { Field } from "formik";
import { CheckboxField } from "../../../Shared/CheckboxField/CheckboxField";
import { CheckedAll } from "../../../Shared/CheckedAll/CheckedAll";
import classNames from "classnames";

export const CPMTable = ({ isFetched, posts }) => {
  const navigate = useNavigate();
  const [setModal] = useOutletContext();

  const { mutate: start } = useStartCPM();
  const { mutate: pause } = usePauseCPM();

  return (
		<table className={s.cpmTable}>
			<thead>
				<tr>
					<th className={s.checkTh}>
						<CheckedAll
							name={"checkboxes"}
							ids={posts?.data.map((el) => el.id)}
						/>
					</th>
					<th className={s.th1}>Название кампании</th>
					<th className={s.th2}>Лимит показов</th>
					<th className={s.th3}>Показов сейчас</th>
					<th className={s.th4}>Лимит бюджета</th>
					<th className={s.th5}>CPM</th>
					<th className={s.th6}>Потрачено</th>
					<th className={s.th7}></th>
				</tr>
			</thead>
			<tbody>
				{isFetched ? (
					posts?.data.map((el) => (
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
							<td className={s.td1} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>{el?.name}</div>
							</td>
							<td className={s.td2} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>{(+el?.cpmBudget / +el?.cpmValue) * 1000}</div>
							</td>
							<td className={s.td3} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>{el?.cpmViews}</div>
							</td>
							<td className={s.td4} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>{el?.cpmBudget}</div>
							</td>
							<td className={s.td5} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>{el?.cpmValue}</div>
							</td>
							<td className={s.td6} onClick={() => navigate("./" + el.id)}>
								<div className={s.center}>
									{el.totalMoneySpent ? el.totalMoneySpent + "₽" : "-"}
								</div>
							</td>
							<td className={s.td7} onClick={() => navigate("./" + el.id)}>
								<div className={s.end}>
									{el?.status === "NOT_MODERATED" ? (
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
									) : el?.status === "ACCEPTED" ? (
										<div className={s.btns}>
											<Dropdown
												className={s.dropdown}
												menuClassName={s.menu}
												disableArrows
												label={
													{
														ACTIVE: (
															<div className={classNames(s.statusItem, s.play)}>
																<IconPlayerPlayFilled size={18}/>
																Показы запущенны
															</div>
														),
														PAUSED: (
															<div className={classNames(s.statusItem, s.pause)}>
																<IconPlayerPauseFilled size={18}/>
																Показы приостановлены
															</div>
														),
														STOPPED: (
															<div className={classNames(s.statusItem, s.stop)}>
																<IconPlayerStopFilled size={18}/>
																Показы завершены
															</div>
														),
														INACTIVE: (
															<div className={s.statusItem}>
																Показы не запущенны
															</div>
														),
													}[el?.cpmStatus]
												}
												options={[
													<div
														className={classNames(s.statusButton, s.play)}
														onClick={(event) => {
															event.stopPropagation();
															start(el.id);
														}}
													>
														<IconPlayerPlayFilled size={18}/>
														Запустить показы
													</div>,
													<div
														className={classNames(s.statusButton, s.pause)}
														onClick={(event) => {
															event.stopPropagation();
															pause(el.id);
														}}
													>
														<IconPlayerPauseFilled size={18}/>
														Приостановить показы
													</div>,
													<div
														className={classNames(s.statusButton, s.stop)}
														onClick={(event) => {
															event.stopPropagation();
															setModal("stop-cpm", { postId: el.id });
														}}
													>
														<IconPlayerStopFilled size={18}/>
														Завершить показы
													</div>,
												]}
											/>
										</div>
									) : null}
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
