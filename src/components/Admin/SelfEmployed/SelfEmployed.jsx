import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CreateSelfEmployed } from './CreateSelfEmployed';
import { EditSelfEmployed } from './EditSelfEmpoloyed';
import { useDataProvider, useNotify } from 'react-admin';
import axios from 'axios';
import { admin } from '../../../api/api';

export const SelfEmployed = (props) => {
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const dataProvider = useDataProvider();
	const notify = useNotify();

	useEffect(() => {
			admin.getRequisites({path: process.env.REACT_APP_API_URL + '/users/' + id + '/self_employed/'})
				.then((data) => {
						setRecord(data);
						setLoading(false);
						return data
				})
				.catch(error => {
						if (error.status === 404) {
								setLoading(false);
						} else {
								notify('Error', 'error');
								setLoading(false);
						}
				});
	}, [dataProvider, id, notify]);

	if (loading) {
			return <Typography>Loading...</Typography>;
	}

	if(!record){
		return <CreateSelfEmployed id={id}/>
	}

	return <EditSelfEmployed id={id}/>
}
