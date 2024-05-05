import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin'
import { useParams } from 'react-router-dom';
import { CreateLegalEntity } from './CreateLegalEntity';
import { EditLegalEntity } from './EditLegalEntity';

export const LegalEntity = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const dataProvider = useDataProvider();
	const notify = useNotify();

	useEffect(() => {
			dataProvider.getOne('users', { id: id + '/legal_entity/' })
				.then(({ data }) => {
						setRecord(data);
						setLoading(false);
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
		return <CreateLegalEntity id={id}/>
	}

	return <EditLegalEntity {...{id, record}}/>
}
