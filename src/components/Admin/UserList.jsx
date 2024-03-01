import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField, BooleanField, ArrayField, SingleFieldList, ChipField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <ImageField source="photoUrl" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }}/>
      <EmailField source="emailData.email" />
      <BooleanField source="telegramData" valueLabelFalse="null" valueLabelTrue="!!telegramData"/>
			<ArrayField source="roles">
					<SingleFieldList linkType={false}>
							<ChipField size="small" />
					</SingleFieldList>
			</ArrayField>
    </Datagrid>
  </List>
);