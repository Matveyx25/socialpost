import { Box, Card, Tab } from '@mui/material';
import React from 'react'
import { UserEdit } from './UserEdit'
import { Requisites } from './Requisites';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Channels } from './Channels';
import { AdvertiserPostsList } from '../AdvertiserPosts/AdvertiserPostsList';
import { CampaignsList } from '../Campaigns/CampaignsList';
import { useGetOne } from 'react-admin';
import { useParams } from 'react-router-dom';

export const UserTabs = () => {
	const [value, setValue] = React.useState(0);
	const {id} = useParams()
	
	const { data: user } = useGetOne('users', {id})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
		<Card title={'Пользователь'}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Общее" value={0} />
						{user?.roles.includes('PUBLISHER') && <Tab label="Каналы" value={1} />}
						<Tab label="Реквизиты" value={2} />
						<Tab label="Рекламные кампании" value={3} />
						<Tab label="Рекламные записи" value={4} />
					</TabList>
				</Box>
				<TabPanel value={0}>
					<UserEdit/>
				</TabPanel>
				{user?.roles.includes('PUBLISHER') && 
					<TabPanel value={1}>
						<Channels/>
					</TabPanel>
				}
				<TabPanel value={2}>
					<Requisites/>
				</TabPanel>
				<TabPanel value={3}>
					<CampaignsList publisher_id={user?.roles.includes('PUBLISHER') ? user?.id : null}/>
				</TabPanel>
				<TabPanel value={4}>
					<AdvertiserPostsList publisher_id={user?.roles.includes('PUBLISHER') ? user?.id : null}/>
				</TabPanel>
			</TabContext>
		</Card>
	)
}
