import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin'
import { useParams } from 'react-router-dom';
import { CreateIE } from './CreateIE';
import { EditIE } from './EditIE';

export const IE = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const dataProvider = useDataProvider();
	const notify = useNotify();

	useEffect(() => {
			dataProvider.getOne('users', { id: id + '/ie/' })
					.then((data) => {
							setRecord(data.data);
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
		return <CreateIE id={id}/>
	}

	return <EditIE {...{id, record}}/>
}
