import React from 'react'
import { Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'
import { useParams } from 'react-router-dom';

export const CryptoWallet = (props) => {
	const { id } = useParams();

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/ie'}>
			<SimpleForm sx={{ maxWidth: 500 }}>
				<SelectInput source="type" choices={[
					{ id: 'USDT', name: 'USDT' },
					{ id: 'Bitcoin', name: 'Bitcoin' },
					{ id: 'Solano', name: 'Solano' },
					{ id: 'Cardano', name: 'Cardano' },
  				{ id: 'Ethereum', name: 'Ethereum' }
				]} label='Криптовалюта' isRequired fullWidth />
				<TextInput source="address" label='Адрес' isRequired fullWidth />
			</SimpleForm>
		</Edit>
	)
}
