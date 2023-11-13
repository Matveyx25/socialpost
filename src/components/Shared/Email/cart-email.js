import React from 'react'
import { Email, Item, renderEmail } from 'react-html-email'
import channels from '../../../data/channels.json'

export const CartEmail = ({cart, name, email, phone, tg, sum}) => {
	return renderEmail(
		<Email title="Заявка на заказ" headCSS={`body { font-family: Arial, sans-serif; }`}>
      <Item>
        <p>От {name},</p>
        <p>Email {email},</p>
        {phone && <p>Телефон {phone},</p>}
        {tg && <p>Телеграмм {tg},</p>}
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
						{cart.map((el) => {
							const channel = channels.find(e => e.id === el.id)
							return ( 
									<tr key={channel.id}>
										<td style={{ border: '1px solid black', padding: '8px' }}>{channel.tile}</td>
										<td style={{ border: '1px solid black', padding: '8px' }}>Нативный</td>
										<td style={{ border: '1px solid black', padding: '8px' }}>{el.count}</td>
										<td style={{ border: '1px solid black', padding: '8px' }}>{+channel?.price.replace(/\s/g, '') * +el.count}₽</td>
									</tr>
								)
							})}
          </tbody>
        </table>
        <p>
          Total: <strong>{sum}</strong>
        </p>
      </Item>
    </Email>
	)
}
