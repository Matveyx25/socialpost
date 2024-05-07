import * as React from "react";
import { FunctionField, Labeled, Show, ShowGuesser, SimpleShowLayout, TextField } from "react-admin";
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

export const DocumentsShow = (props) => {
	const {userId} = props?.record

	return (
		<Show {...props}>
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

			<Show resource={'users'} id={userId + '/' + requisites[props?.record?.type]}>
				<SimpleShowLayout>
					{{	
						'INDIVIDUAL_ENTREPRENEUR': <ShowIE/>,
						'SELF_EMPLOYED': <ShowSelfEmployed/>,
						'LEGAL_ENTITY': <ShowLegalEntity/>,
						}[props?.record?.type]}
				</SimpleShowLayout>
			</Show>
		</Show>
)};