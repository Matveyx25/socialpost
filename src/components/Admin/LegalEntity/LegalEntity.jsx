import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { useParams } from 'react-router-dom';
import { CreateLegalEntity } from './CreateLegalEntity';
import { EditLegalEntity } from './EditLegalEntity';
import { admin } from '../../../api/api';

export const LegalEntity = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const notify = useNotify();

	useEffect(() => {
		admin.getRequisites({path: process.env.REACT_APP_API_URL + '/users/' + id + '/legal_entity/'})
				.then((data) => {
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
	}, [id]);

	if (loading) {
			return <Typography>Loading...</Typography>;
	}

	if(!record){
		return <CreateLegalEntity id={id}/>
	}

	return <EditLegalEntity id={id}/>
}
