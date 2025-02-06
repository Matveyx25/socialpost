import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdvertiserPostsEdit } from './AdvertiserPostsEdit';
import { RequestsList } from '../Requests/RequestsList';

export const AdvertiserPostsTabs = (props) => {
	const {id} = useParams()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	return (
		<Card>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="basic tabs example">
						<Tab label="ОБЩЕЕ" value={0} />
						<Tab label="Заявки" value={1} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<AdvertiserPostsEdit {...props}/>
				</TabPanel>
				<TabPanel value={1}>
					<RequestsList filter={{campaign_post_id: id}}/>
				</TabPanel>
			</TabContext>
		</Card>
)};