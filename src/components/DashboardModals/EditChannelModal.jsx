import { Modal } from "../Shared/Modal/Modal";
import s from "./DashboardModals.module.scss";
import { InputField } from "../Shared/Input/Input";
import { Button } from "../Shared/Button/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useUpdateChannel } from "../../hooks/useUpdateChannel";
import { useMyChannelById } from "../../hooks/useMyChannelById";
import { Loader } from "../Shared/Loader/Loader";
import { useEffect } from "react";
import { Checkbox } from "../Shared/Checkbox/checkbox";
import { useAllDurations } from "../../hooks/durations";
import { transformDuration } from "../../helpers/transformDuratuin";

export const EditChannelModal = ({ isOpen, setOpen, modalParams }) => {
  const { mutate: updateChannel } = useUpdateChannel();
  const {
    data: channel,
    isFetching,
    refetch,
  } = useMyChannelById(modalParams?.channelId);
  const { data: durations } = useAllDurations();

  const validator = Yup.object().shape({
    nativePostPrice: Yup.string().matches(
      /^\d+$/,
      "Можно вводить только цифры"
    )
  })

  useEffect(() => {
    if (isOpen && modalParams?.channelId) {
      refetch();
    }
  }, [isOpen]);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={"Редактирование"}
      name={"edit-channel"}
    >
      {!isFetching ? (
        <Formik
          initialValues={{
            nativePostPrice:
              typeof channel?.nativePostPrice === "number"
                ? channel?.nativePostPrice
                : "",
            ...(channel?.prices?.reduce((acc, el) => {
              acc[`price${el.duration.id}`] = el?.price;
              return acc;
            }, {}) || {}),
          }}
          validationSchema={validator}
					validate={(values) => {
							const { nativePostPrice, ...rest } = values;
							
							const filledFieldsCount = Object.values(rest).filter(
								value => value !== "" && value !== undefined && value !== null
							).length;							

							if (filledFieldsCount > 5) {
								return { _error: "Можно заполнить не более 5 полей" };
							}

							return 
					}}
          onSubmit={(values) => {
            const prices = Object.entries(values)
              .filter(([key]) => key.startsWith("price"))
              .map(([key, price]) => {
								if(+price > 0) {
									return {
										durationId: parseInt(key.replace("price", ""), 10),
										price: typeof +price === "number" ? +price : 0, 
									}
								}
							}).filter(_ => {if(_) return _});

            updateChannel({
              data: {
                nativePostPrice:
                  typeof +values.nativePostPrice === "number"
                    ? +values.nativePostPrice
                    : 0,
                nativePostPriceEnabled: true,
                prices,
              },
              id: modalParams?.channelId,
            });
            setOpen();
          }}
        >
          {({ dirty, isValid, values, touched, errors }) => (
            <Form>
              <div className={s.form}>
								{errors._error && <div className={s.error}>{errors._error}</div>}
                <div className={s.input}>
                  <InputField
                    label={
                      <div className={s.inputFlexHeader}>
                        Нативное размещение
                      </div>
                    }
                    id="nativePostPrice"
                    name="nativePostPrice"
                  />
                </div>
                {durations?.map((duration) => (
                  <div className={s.input}>
                    <InputField
                      label={
                        <div className={s.inputFlexHeader}>
                          Размещение {transformDuration(duration)}
                        </div>
                      }
                      id={`price${duration.id}`}
                      name={`price${duration.id}`}
                    />
                  </div>
                ))}
                {touched?.nativePostPrice && !values?.nativePostPrice && (
                  <div className={s.errorMessage}>
                    Заполните хотя бы одно поле
                  </div>
                )}
                <div className={s.rowBtns}>
                  <Button
                    label="Отменить"
                    theme="secondary"
                    className={s.btnHalf}
                    type="button"
                    onClick={() => setOpen()}
                  />
                  <Button
                    label="Применить"
                    className={s.btnHalf}
                    disabled={!dirty || !isValid || errors?.length > 0}
                    type="submit"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Loader />
      )}
    </Modal>
  );
};
