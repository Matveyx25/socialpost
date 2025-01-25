import { useState } from "react";
import { Create, SimpleForm, useDataProvider, useNotify, useRefresh } from "react-admin";

export const CustomCreateController = ({ resource, id, children }) => {
	const [record, setRecord] = useState({});
	const dataProvider = useDataProvider();
	const notify = useNotify();
	const refresh = useRefresh();

	const save = (data) => {
			dataProvider.update(resource, { id, data })
					.then(() => {
							notify('Element updated');
							refresh();
					})
					.catch((error) => notify('Error: element not updated', 'warning'));
	};

	return (
			<Create {...{ resource, id }} title={''}>
					<SimpleForm  record={record} onSubmit={save}>
							{children}
					</SimpleForm>
			</Create>
	);
};
