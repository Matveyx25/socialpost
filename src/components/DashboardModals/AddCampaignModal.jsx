import { Modal } from "../Shared/Modal/Modal";
import s from "./DashboardModals.module.scss";
import { InputField } from "../Shared/Input/Input";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  FormikStep,
  FormikStepper,
} from "../Shared/FormikStepper/FormikStepper";
import { Field } from "formik";
import { Select } from "../Shared/Select/Select";
import { useMyClients } from "../../hooks/useMyClients";
import { useAddCampaign } from "../../hooks/useAddCampaign";
import { NavLink } from "react-router-dom";
import {
  IconCircleFilled,
  IconGraph,
  IconPhotoDollar,
  IconPhotoStar,
  IconPlus,
} from "@tabler/icons-react";
import classNames from "classnames";
import { useProfile } from "../../hooks/useProfile";
import { useMyClientContracts } from "../../hooks/useMyClientContracts";

const Radio = ({ name, value, title, text, icon, disabled }) => {
  return (
    <Field {...{ name, value }} type={"radio"}>
      {({ field }) => (
        <div className={s.radioItem}>
          <input
            {...field}
            id={value}
            value={value}
            checked={field.checked}
            name={name}
            type="radio"
            disabled={disabled}
          />
          <label htmlFor={value}>
            <div
              className={classNames(
                s.radioFlex,
                field.checked ? s.active : "",
                disabled ? s.disabled : ""
              )}
            >
              <div className={s.icon}>{icon}</div>
              <div className={s.content}>
                <div className={s.title}>{title}</div>
                <div className={s.text}>{text}</div>
              </div>
              <div
                className={classNames(
                  s.radioWrapper,
                  field.checked ? s.active : ""
                )}
              >
                {/* {field.checked ? */}
                <IconCircleFilled size={12} />
                {/* : null} */}
              </div>
            </div>
          </label>
        </div>
      )}
    </Field>
  );
};

const Content = ({ setOpen, currentStep, setCurrentStep }) => {
	const { data: profile } = useProfile()
  const { data: clients } = useMyClients();
  const { mutate: createCompany } = useAddCampaign();
	const [client, setClient] = useState(null)

  const handleSubmit = (values) => {
    createCompany(profile?.isAgency ? values : {...values, clientId: null});
    setOpen();
    setCurrentStep(0);
  };

	const { data: contracts } = useMyClientContracts(client);

  return (
    <FormikStepper
      initialValues={{
        name: "",
        type: "NATIVE_POST",
        clientId: null,
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      onCancel={setOpen}
      step={currentStep}
      setStep={setCurrentStep}
			btnLabel="Создать кампанию"
    >
      <FormikStep
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Заполните поле"),
        })}
      >
        <div className={s.form}>
          <div className={s.input}>
            <InputField
              label={"Название рекламной кампании"}
              required
              placeholder={"Название"}
              id="name"
              name="name"
            />
          </div>
        </div>
      </FormikStep>
      {profile?.isAgency ? <FormikStep
        validationSchema={Yup.object().shape({
          clientId: Yup.string().required("Заполните поле"),
          clientContractId: Yup.string().required("Заполните поле"),
        })}
      >
        <div className={s.form}>
          <div className={s.input}>
            {clients && (
              <Field name="clientId">
                {({ field: { value }, form: { setFieldValue } }) => (
                  <Select
                    label={"Кто размещает рекламу?"}
                    id="clientId"
                    name="clientId"
                    options={clients?.data.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    required={true}
                    placeholder={"Выберите клиента"}
                    fullWidth={true}
                    value={value}
                    isMulti={false}
                    setSelectedOption={(v) => {
                      setFieldValue("clientId", v.value)
											setClient(v.value)
										}}
                    lastElement={
                      <NavLink
                        to={"/clients"}
                        className={s.addOption}
                        onClick={() => {
                          setOpen();
                          setCurrentStep(0);
                        }}
                      >
                        <IconPlus size={18} />
                        Добавить клиента
                      </NavLink>
                    }
                  />
                )}
              </Field>
            )}
						</div>
						{(client && !contracts?.data.length) ? 
						<p className={s.errorMessage}>
							У этого клиента нет договоров
						</p>
						 : null}
						<div className={s.input}>
            {contracts?.data.length > 0 && (
              <Field name="clientContractId">
                {({ field: { value }, form: { setFieldValue } }) => (
                  <Select
                    label={"Выберите договор"}
                    id="clientContractId"
                    name="clientContractId"
                    options={contracts?.data.map((c) => ({
                      value: c.id,
                      label: c.contractNumber,
                    }))}
                    required={true}
                    placeholder={"Выберите по номеру договора"}
                    fullWidth={true}
                    value={value}
                    isMulti={false}
                    setSelectedOption={(v) =>
                      setFieldValue("clientContractId", v.value)
                    }
                    lastElement={
                      <NavLink
                        to={"/clients/" + client}
                        className={s.addOption}
                        onClick={() => {
                          setOpen();
                          setCurrentStep(0);
                        }}
                      >
                        <IconPlus size={18} />
                        Добавить договор
                      </NavLink>
                    }
                  />
                )}
              </Field>
            )}
          </div>
        </div>
      </FormikStep> : null}
      <FormikStep
        validationSchema={Yup.object().shape({
          type: Yup.string().required("Заполните поле"),
        })}
      >
        <div className={s.form}>
          <div className={s.input}>
            <div className={s.radiosWrapper}>
              <Radio
                name={"type"}
                title={"Размещение рекламных постов"}
                text={
                  "Небольшое описание на несколько строк, предпологаемое их количество – примерно 2, но может быть и 3"
                }
                icon={
                  <IconPhotoDollar size={24} color="rgba(105, 138, 255, 1)" />
                }
                value={"AD_POST"}
              />
              <Radio
                name={"type"}
                title={"Размещение нативных постов"}
                text={
                  "Небольшое описание на несколько строк, предпологаемое их количество – примерно 2, но может быть и 3"
                }
                icon={
                  <IconPhotoStar size={24} color="rgba(105, 138, 255, 1)" />
                }
                value={"NATIVE_POST"}
              />
              <Radio
                name={"type"}
                title={"Кампания с фиксированным СРМ"}
                text={
                  "Небольшое описание на несколько строк, предпологаемое их количество – примерно 2, но может быть и 3"
                }
                icon={<IconGraph size={24} color="rgba(105, 138, 255, 1)" />}
                value={"FIXED_CPM"}
              />
            </div>
          </div>
        </div>
      </FormikStep>
    </FormikStepper>
  );
};

export const AddCampaignModal = ({ isOpen, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
	const { data: profile } = useProfile()
 
  useEffect(() => {
		if(isOpen !== "add-campaign"){
			setCurrentStep(0);
		}
  }, [isOpen]);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Создать рекламную кампанию ${currentStep + 1}/${profile?.isAgency ? 3 : 2}`}
      name={"add-campaign"}
    >
      <Content {...{ setOpen, isOpen, currentStep, setCurrentStep }} />
    </Modal>
  );
};
