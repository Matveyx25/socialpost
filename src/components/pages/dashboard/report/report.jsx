import React, { useState } from 'react'
import s from './report.module.scss'
import { DashboardCard } from '../dashboard-card'
import { IconChevronLeft, IconExternalLink } from '@tabler/icons-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '../../../Shared/Button/Button';
import { useOutletContext } from 'react-router-dom'

export const Report = () => {
	const [setModal] = useOutletContext()

	const message = `
**5 дней дизайн-прокачки. 4 интересные UX‑задачи с детальными разборами от дизайн-лидов, и методами решений, которые пригодятся в реальной работе 🤯**


Все это — [интенсив DSGNERS Boost](https://boost.dsgners.ru/?erid=Kra23Yh7d)


**Что за формат такой?**


Немножко теории, обсуждаешь задачу с кураторами, идешь выполнять, потом вместе еще раз решаешь с дизайн-лидами, где они рассказывают как решили бы они. Repeat x 4.


На тусовке будут лиды: CreativePeople, Humbleteam, Ozon, Яндекс и ИВИ.


**Что бустанешь?**


Основные скиллы — научишься решать задачи, которые часто дают на тестовых и поймешь как делать дизайн до захода в Фигму. Подцепишь крутые методологии и способы мышления дизайн-лидов, залезешь прямо к ним в голову :)


Дополнительно: увеличится работоспособность, поймешь, что 90% успеха проекта начинается до макетов в фигме и конечно обрастешь дизайн-броней, которая позволит защищаться от заказчиков и тестовых.


Когда и как?


5 дней с 26 ноября. Онлайн. С дизайн лидами


⏩ Залететь в заварушку: [https://boost.dsgners.ru](https://boost.dsgners.ru/?erid=Kra23Yh7d)


_Реклама ИП Мальков Е.В. ИНН 310803024395_`

	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<div className={s.cardHeader}>
						<IconChevronLeft />
						Бесплатный урок – превью
					</div>
					<div className={s.line}></div>
					<div className={s.preview}></div>
					<div className={s.content}>
						<Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
					</div>
					<Button className={s.btn} label={'Заценить'}/> 
				</DashboardCard>
			</div>
				<DashboardCard>
					<div className={s.cardHeader}>
						Информация
						<div className={s.btns}>
							<Button label={'Отклонить'} theme='secondary' size='small' onClick={() => setModal('remove-report')}/> 
							<Button label={'Подтвердить'} size='small' onClick={() => setModal('approve-report')}/> 
						</div>
					</div>
					<div className={s.line}></div>
					<div className={s.info}>
						<div>
							<p>Название РК</p>
							<span>Онлайн-Школа “Импульс”</span>
						</div>
						<div>
							<p>Название обьявления</p>
							<span>Бесплатный урок</span>
						</div>
					</div>
					<div className={s.info}>
						<div>
							<p>Канал публикации</p>
							<span>Marvel/DC</span>
						</div>
						<div>
							<p>Дата публикации</p>
							<span>25.10.2023 в 12:30</span>
						</div>
						<div>
							<p>Дата выполнения</p>
							<span>-</span>
						</div>
						<div>
							<p>Стоимость</p>
							<span>2,400₽ (Нативное размещение)</span>
						</div>
						<div>
							<p>Ссылка</p>
							<IconExternalLink size={16} color='#436CFF'/>
						</div>
					</div>
				</DashboardCard>
		</div>
	)
}
