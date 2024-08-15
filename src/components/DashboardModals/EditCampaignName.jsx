import { Modal } from "../Shared/Modal/Modal";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import s from './DashboardModals.module.scss'
import { Button } from "../Shared/Button/Button";
import { InputField } from "../Shared/Input/Input";
import { useUpdateCampaign } from '../../hooks/useUpdateCampaign';
import { useCampaignById } from "../../hooks/useCampaignById";

export const EditCampaignName = ({ isOpen, setOpen, modalParams }) => {
  const { mutate: updateCampaign } = useUpdateCampaign();
  const { data: campaign } = useCampaignById(modalParams?.editCampaignId);

  const handleSubmit = (values) => {
		updateCampaign(values);
    setOpen();
  };

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Редактировать РК`}
      name={"edit-campaign"}
    >
     <Formik
        initialValues={{
          name: campaign?.name,
          id: modalParams?.editCampaignId,
        }}
				enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
				validationSchema={Yup.object().shape({
					id: Yup.string().required("Выберите РК"),
					name: Yup.string().required("Поле не может быть пустым")
				})}
      >
				<Form>
            <div className={s.scroller}>
              <div className={s.form}>
                <div className={s.input}>
										<InputField
											label={"Название"}
											required
											placeholder={"Название"}
											id="name"
											name="name"
										/>
                </div>
								<div className={s.rowBtns}>
									<Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
									<Button label={'Сохранить'} type="submit" className={s.btnHalf}/>
								</div>
              </div>
            </div>
				</Form>
      </Formik>
    </Modal>
  );
};
