import { useState } from "react";
import { Box, Card, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AdvertiserClientsContracts } from './AdvertiserClientsContracts';
import { AdvertiserClientsEdit } from './AdvertiserClientsEdit';

export const AdvertiserClientsTabs = () => {
	const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
		<Card>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Общее" value={0} />
						<Tab label="Договоры" value={1} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<AdvertiserClientsEdit />
				</TabPanel>
				<TabPanel value={1}>
					<AdvertiserClientsContracts/>
				</TabPanel>
			</TabContext>
		</Card>
	)
}