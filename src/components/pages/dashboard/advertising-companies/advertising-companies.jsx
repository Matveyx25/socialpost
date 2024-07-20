import React, { useState } from "react";
import { Pagination } from "../../../Shared/Pagination/Pagination";
import { Loader } from "../../../Shared/Loader/Loader";
import { IconPlus, IconRefresh, IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import { Button } from "../../../Shared/Button/Button";
import { Select } from "../../../Shared/Select/Select";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useMyCampaign } from "../../../../hooks/useMyCampaign";
import s from "./advertising-companies.module.scss";
import { useMyClients } from "../../../../hooks/useMyClients";
import classNames from "classnames";
import { useFormik } from "formik";

export const AdvertisingCompanies = () => {
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [client, setClient] = useState();
	const [allChecked, setAllChecked] = useState(false)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
	const navigate = useNavigate()

  const { data: companies, isFetched } = useMyCampaign({
    type: type?.value,
    status: status?.value,
    clientId: client?.value,
    _start: (page - 1) * 30,
    _end: page * 30,
  });

  const { data: clients } = useMyClients();

  const [setModal] = useOutletContext();

	const formik = useFormik({
		initialValues: {
			clientIds: []
		},
		onSubmit: (values) => {
      console.log(values);
    }
	})

  return (
    <div className={s.grid}>
      <div className={s.tableCard}>
        <div className={s.filters}>
          <div className={s.selects}>
            {clients?.data && (
              <Select
                options={clients?.data.map((el) => ({
                  value: el.id,
                  label: el.name,
                }))}
                required={true}
                placeholder={"Клиент"}
                setSelectedOption={setClient}
                value={client}
                fullWidth={true}
                isMulti={false}
              />
            )}
            <Select
              options={[
                { label: "Размещение рекламных постов", value: "AD_POST" },
                { label: "Размещение нативных постов", value: "NATIVE_POST" },
                { label: "Кампания с фиксированным СРМ", value: "FIXED_CPM" },
              ]}
              required={true}
              placeholder={"Тип"}
              setSelectedOption={setType}
              value={type}
              fullWidth={true}
              isMulti={false}
            />
            <Select
              options={[
                { label: "Активная", value: "ACTIVE" },
                { label: "Завершенная", value: "COMPLETED" },
              ]}
              required={true}
              placeholder={"Статус"}
              setSelectedOption={setStatus}
              value={status}
              fullWidth={true}
              isMulti={false}
            />
						<Button
							label="Сбросить"
							leftIcon={<IconRefresh />}
							theme="secondary"
							className={s.refreshBtn}
							disabled={!client && !type && !status}
							onClick={() => {
								setClient(null);
								setType(null);
								setStatus(null);
							}}
						/>
          </div>
          <Button
            label="Создать кампанию"
            leftIcon={<IconPlus size={20} />}
            className={s.addBtn}
            onClick={() => {
              setModal("add-campaign");
            }}
          />
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Клиент</th>
                <th>Название РК</th>
                <th>Тип</th>
                <th>Общий лимит трат</th>
                <th>Всего потрачено</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {isFetched ? (
                companies?.data.map((el) => (
                  <tr key={el.id} onClick={() => navigate('./' + el.id)}>
                    <td>
                      <div className={s.center}>{el?.client?.name}</div>
                    </td>
                    <td>
                      <div className={s.center}>{el?.name}</div>
                    </td>
                    <td>
                      <div className={s.center}>
                        {
                          {
                            AD_POST: "Размещение рекламных постов",
                            NATIVE_POST: "Размещение нативных постов",
                            FIXED_CPM: "Кампания с фиксированным СРМ",
                          }[el.type]
                        }
                      </div>
                    </td>
                    <td>
                      <div className={s.center}>{el.moneyBlocked ? el.moneyBlocked + '₽' : '-'}</div>
                    </td>
                    <td>
                      <div className={s.center}>{el.totalMoneySpent ? el.totalMoneySpent + '₽' : '-'}</div>
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
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
        {companies?.headers["x-total-count"] && (
          <Pagination
            currentPage={page}
            totalCount={+companies?.headers["x-total-count"]}
            pageSize={size}
            setSize={setSize}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
};
