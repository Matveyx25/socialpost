import { IconCheck, IconX } from "@tabler/icons-react";
import { Datagrid, DateField, FunctionField, List, TextField } from "react-admin";
import { CustomEmpty } from "../CustomEmpty";
import { useParams } from "react-router-dom";

const renderRecognizedByNDS = (record) => !!record.recognizedByNDS === true ? <IconCheck/> : <IconX/>

export const AdvertiserClientsContracts = () => {
	const { id } = useParams();

	return (
	 <List exporter={false} resource={'channels'} filter={{clientId: id}} empty={<CustomEmpty message={'Договоров нет'}/>}>
		 <Datagrid rowClick="edit"  bulkActionButtons={false}>
		 		<TextField source="id" />
				<TextField label="№ договора с клиентом" source="contractNumber"/>
				<TextField label="Предмет договора" source="contractSubject"/>
				<TextField label="Сумма договора" source="moneyAmount"/>
				<DateField label="Дата заключения договора" source="conclusionDate"/>
				<FunctionField label="НДС" source="recognizedByNDS" render={renderRecognizedByNDS}/>
		 </Datagrid>
	 </List>
 );
}