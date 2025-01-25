import { Box, Card, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { AdvertiserContrAgentList } from "./AdvertiserContrAgentList";
import { AdvertiserClientsList } from './AdvertiserClientsList';

export const AdvertiserClientsMainList = (props) => {
	const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
	
	return (
	<Card>
		<TabContext value={value}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<TabList onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Клиенты (Агентств)" value={0} />
					<Tab label="Контрагенты" value={1} />
				</TabList>
			</Box>
			<TabPanel value={0}>
				<AdvertiserClientsList />
			</TabPanel>
			<TabPanel value={1}>
				<AdvertiserContrAgentList/>
			</TabPanel>
		</TabContext>
	</Card>
)};
