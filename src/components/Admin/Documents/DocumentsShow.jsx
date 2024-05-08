import * as React from "react";
import { FunctionField, Labeled, Show, ShowGuesser, SimpleShowLayout, TextField, useShowContext } from "react-admin";
import { ShowIE } from '../IE/ShowIE';
import { ShowSelfEmployed } from "../SelfEmployed/ShowSelfEmployed";
import { ShowLegalEntity } from '../LegalEntity/ShowLegalEntity';

const requisites = {
	'INDIVIDUAL_ENTREPRENEUR': 'ie',
	'SELF_EMPLOYED': 'self_employed',
	'LEGAL_ENTITY': 'legal_entity',
}

const renderType = (record) => {
	const type = record.type

	const types = {
		'INDIVIDUAL_ENTREPRENEUR': 'ИП',
		'SELF_EMPLOYED': 'Самозанятый',
		'LEGAL_ENTITY': 'Юр. Лицо',
	}

	return <TextField record={{type: types[type]}} source="type"/>
};

const Content = () => {
	const {record} = useShowContext()

	return (
		<>		
			<SimpleShowLayout>
				<Labeled>
					<TextField label="Номер документа" source="id"/>
				</Labeled>
				<Labeled>
					<TextField label="Дата заклюючения" source="conclusionDateTime"/>
				</Labeled>
				<Labeled>
					<FunctionField label="Статус реквизитов"  source="type" render={renderType}/>
				</Labeled>
			</SimpleShowLayout>

			<Show resource={'users'} id={record?.userId + '/' + requisites[record?.type]}>
				<SimpleShowLayout>
					{{	
						'INDIVIDUAL_ENTREPRENEUR': <ShowIE/>,
						'SELF_EMPLOYED': <ShowSelfEmployed/>,
						'LEGAL_ENTITY': <ShowLegalEntity/>,
						}[record?.type]}
				</SimpleShowLayout>
			</Show>
		</>
	)
}

export const DocumentsShow = (props) => {
	return (
		<Show {...props}>
			<Content/>
		</Show>
)};