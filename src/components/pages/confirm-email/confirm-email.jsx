import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import s from './confirm-email.module.scss'
import { auth } from '../../../api/api'

export const ConfirmEmail = () => {
	const [isConfirm, setIsConfirm] = useState(false)
	const [isError, setIsError] = useState(false)
	const {token} = useParams()

	useEffect(() => {
		auth.emailConfirm(token).then(res => {
			if(res.status == 200){
				setIsConfirm(true)
			}
		}).catch(err => {
			setIsConfirm(true)
			setIsError(true)
		});
	}, [])

	return (
		<div className={s.wrapper}>
			{isConfirm ? 
			isError ? <div className={s.wait}>Ссылка невалидна</div> :
				<div className={s.successWrapper}>
					<h2>Почта успешно подтверждена. </h2>
					<p>А пока...</p>
					<NavLink to="/">Вернуться на главную</NavLink>
					<img src="/images/contacts-path.svg" alt="" />
					<div className={s.plane}>
							<Player
								autoplay
								loop
								src="/lotties/Plane.json"
								speed={.7}
								style={{ height: '100%', objectFit:'cover'}}
							/>
					</div>
				</div>
			:
			<div className={s.wait}>Ожидаем ответа...</div>
			}
		</div>
	)
}
