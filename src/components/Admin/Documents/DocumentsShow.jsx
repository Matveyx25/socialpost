import * as React from "react";
import { DateField, FunctionField, Labeled, Show, ShowGuesser, SimpleShowLayout, TextField, useShowContext, useShowController } from "react-admin";
import { ShowIE } from '../IE/ShowIE';
import { ShowSelfEmployed } from "../SelfEmployed/ShowSelfEmployed";
import { ShowLegalEntity } from '../LegalEntity/ShowLegalEntity';

const requisites = {
	'INDIVIDUAL_ENTREPRENEUR': '/ie/',
	'SELF_EMPLOYED': '/self_employed/',
	'LEGAL_ENTITY': '/legal_entity/',
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
	const {record: requisitesRecord} = useShowController({resource: 'users', id: record?.userId + requisites[record?.type]})

	return (
		<>		
			<SimpleShowLayout>
				<Labeled fullWidth>
					<TextField label="Номер документа" source="id"/>
				</Labeled>
				<Labeled fullWidth>
					<DateField label="Дата заклюючения" source="conclusionDateTime" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
				</Labeled>
				<Labeled fullWidth>
					<FunctionField label="Статус реквизитов"  source="type" render={renderType}/>
				</Labeled>
			</SimpleShowLayout>

			<SimpleShowLayout record={requisitesRecord}>
				{{	
					'INDIVIDUAL_ENTREPRENEUR': <ShowIE/>,
					'SELF_EMPLOYED': <ShowSelfEmployed/>,
					'LEGAL_ENTITY': <ShowLegalEntity/>,
					}[record?.type]}
			</SimpleShowLayout>
		</>
	)
}

export const DocumentsShow = (props) => {
	return (
		<Show {...props}>
			<Content/>
		</Show>
)};