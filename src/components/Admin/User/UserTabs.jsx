import { Box, Card, Tab, Tabs } from '@mui/material'
import React from 'react'
import { UserEdit } from './UserEdit'
import { Requisites } from './Requisites';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export const UserTabs = () => {
	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
		<Card>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Общее" value={0} />
						<Tab label="Реквизиты" value={1} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<UserEdit/>
				</TabPanel>
				<TabPanel value={1}>
					<Requisites/>
				</TabPanel>
			</TabContext>
		</Card>
	)
}
