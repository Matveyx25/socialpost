import { Box, Card, Tab, Tabs } from '@mui/material'
import React from 'react'
import { UserEdit } from './UserEdit'
import { Requisites } from './Requisites';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Channels } from './Channels';

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
						<Tab label="Каналы" value={1} />
						<Tab label="Реквизиты" value={2} />
						<Tab label="Рекламные кампании" value={3} />
						<Tab label="Посты" value={4} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<UserEdit/>
				</TabPanel>
				<TabPanel value={1}>
					<Channels/>
				</TabPanel>
				<TabPanel value={2}>
					<Requisites/>
				</TabPanel>
				<TabPanel value={3}>
				Рекламные кампании
				</TabPanel>
				<TabPanel value={4}>
				Посты
				</TabPanel>
			</TabContext>
		</Card>
	)
}
