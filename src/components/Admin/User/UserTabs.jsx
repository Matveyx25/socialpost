import { Box, Card, Tabs, Typography } from '@mui/material'
import React from 'react'
import { Tab, TabbedForm } from 'react-admin'
import { UserEdit } from './UserEdit'
import { Requisites } from './Requisites';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const UserTabs = () => {
	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
		<Card>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Общее" {...a11yProps(0)} />
					<Tab label="Реквизиты" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<UserEdit/>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<Requisites/>
			</CustomTabPanel>
		</Card>
	)
}
