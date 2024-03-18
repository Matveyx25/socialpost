import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { useAddChannel } from '../../hooks/useAddChannel';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

export const AddChannelModal = ({isOpen, setOpen}) => {
	const telegramChannelRegex = /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/;

	const { mutate: createChannel } = useAddChannel()

  const validator = Yup.object().shape({
    url: Yup.string()
      .matches(telegramChannelRegex, "Ссылка на канал не валидна")
      .required("Заполните поле"),
  });

  const handleSubmit = (values) => {
    if (!values.password || !values.email) {
      return null;
    }

		createChannel({
			url: values.url
		})
		setOpen()
  };

  return (
		<Modal {...{isOpen, setOpen}} title={'Добавить канал'} name={'add-channel'}>
			<Formik
        initialValues={{
          url: ""
        }}
        validationSchema={validator}
				onSubmit={(values) => {
					handleSubmit(values)
				}}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className={s.form}>
              <div className={s.input}>
                <InputField
                  label={"Ссылка на канал"}
                  required
                  placeholder={'https://t.me/'}
                  id="url"
                  name="url"
                />
							</div>
              <Button
                label="Добавить"
                disabled={!dirty || !isValid}
              />
            </div>
          </Form>
        )}
      </Formik>
		</Modal>
  );
};
