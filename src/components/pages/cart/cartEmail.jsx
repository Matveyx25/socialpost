import { useChannelById } from "../../../hooks/useChannelById"

const CartTableRow = ({el}) => {
	const {data: channel} = useChannelById(el.id)

	return ( 
			<tr key={el.id}>
				<td style={{ border: '1px solid black', padding: '8px' }}>{channel?.title}</td>
				<td style={{ border: '1px solid black', padding: '8px' }}>{el.format}</td>
				<td style={{ border: '1px solid black', padding: '8px' }}>{el.count}</td>
				<td style={{ border: '1px solid black', padding: '8px' }}>
					{+el.price * +el.count}₽
				</td>
			</tr>
		)
}

export const renderHtmlEmail = (values, cart, sum) => {
	return (
		<>
			<p>От {values.fullName},</p>
				<p>Email {values.email},</p>
				{values.phone && <p>Телефон {values.phone},</p>}
				{values.tg && <p>Телеграмм {values.tg},</p>}
				<p>Корзина</p>
				<table style={{ borderCollapse: 'collapse', width: '100%' }}>
					<thead>
						<tr>
							<th style={{ border: '1px solid black', padding: '8px' }}>Название постов</th>
							<th style={{ border: '1px solid black', padding: '8px' }}>Формат размещений</th>
							<th style={{ border: '1px solid black', padding: '8px' }}>Кол-во размещений</th>
							<th style={{ border: '1px solid black', padding: '8px' }}>Общая стоимость размещений</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((el) => <CartTableRow {...{el}}/>)}
					</tbody>
				</table>
				<p>
					 Итого: <strong>{cart.length ? (sum + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
						 : '0'} ₽</strong> 
				</p>
			</>
	)
}