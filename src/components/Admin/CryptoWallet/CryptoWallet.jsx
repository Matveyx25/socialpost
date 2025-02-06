import React from 'react'
import { Edit, SelectInput, TextInput, useRecordContext } from 'react-admin'
import { Box } from 'react-html-email';
import { useParams } from 'react-router-dom';

export const CryptoWallet = (props) => {
	const { id } = useParams();
	const record = useRecordContext()

	if(!record){
		return null
	}

	return (
		<Edit {...props} id={''} resource={'users/' + id + '/crypto_wallet_details'}>
			<Box sx={{ maxWidth: 800 }}>
				<SelectInput source="type" choices={[
					{ id: 'USDT', name: 'USDT' },
					{ id: 'Bitcoin', name: 'Bitcoin' },
					{ id: 'Solano', name: 'Solano' },
					{ id: 'Cardano', name: 'Cardano' },
  				{ id: 'Ethereum', name: 'Ethereum' }
				]} label='Криптовалюта' isRequired fullWidth />
				<TextInput source="address" label='Адрес' isRequired fullWidth />
			</Box>
		</Edit>
	)
}
