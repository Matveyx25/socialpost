import React from 'react'
import s from './faq.module.scss'
import { DashboardCard } from '../dashboard-card';
import { Button } from '../../../Shared/Button/Button';
import { Accordion } from '../../../Shared/Accordion/Accordion';
import { useNavigate, useNavigation } from 'react-router-dom';

export const FAQ = () => {
	const navigation = useNavigate()

	return (
		<div className={s.grid}>
			<DashboardCard>
				<div className={s.cardHeader}>
					Часто задаваемые вопросы
					<Button label={"Написать в поддержку"} className={s.btn} onClick={() =>  window.open('https://t.me', '_blank')}/>
				</div>
			</DashboardCard>
			<div className={s.questions}>
				<Accordion title={'Здарова! Шо ты голова?'} active content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
				<Accordion title={'Здарова! Шо ты голова?'} content={<p>Страница с детальным обзорома заявок – вкладки (как в браузере) запросы на размещения;<br/> ожидают публикации; активные; выполненные; отклоненные; невыполненные</p>}/>
			</div>
		</div>
	)
}
