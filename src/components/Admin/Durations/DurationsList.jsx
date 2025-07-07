import { IconCheck, IconX } from "@tabler/icons-react";
import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { CustomEmpty } from '../CustomEmpty';
import { PostPagination } from "../PostPagination";


export const DurationsList = (props) => (
  <List {...props} exporter={false} pagination={<PostPagination/>}>
  {/* <List {...props} exporter={false} empty={<CustomEmpty createBtn={'Создать тип'} message={'Типов публикации нет'}/>} pagination={<PostPagination/>}> */}
    <Datagrid  bulkActionButtons={false} rowClick="edit">
      <TextField source="id" />
      <TextField source="publishDays" label="Длительность публикации(дней)"/>
      <TextField source="retentionHours" label="Время удержания(часов)"/>
			<FunctionField label="Скрыто" source="isHidden" render={(record) => record.isHidden ? <IconCheck/> : <IconX/>}/>
    </Datagrid>
  </List>
);