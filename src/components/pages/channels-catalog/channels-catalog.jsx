import React, { useState } from 'react'
import s from './channels-catalog.module.scss'
import { Filters } from '../../Filters/Filters'
import Select from 'react-select'
import { IconChevronDown } from '@tabler/icons-react';
import { ChannelCard } from '../../ChannelCard/ChannelCard';

const options = [
  { value: 'subscribers more', label: 'Подписчиков: Больше' },
  { value: 'subscribers less', label: 'Подписчиков: Меньше' },
];

export const ChannelsCatalog = () => {
	const [selectedOption, setSelectedOption] = useState(null);

	return (
		<div className={s.wrapper}>
			<div className="container">
				<h2 className={s.title}>
					Каталог каналов
				</h2>
				<p className={s.subtitle}>
					13, 034 каналов
				</p>
				<div className={s.flex}>
					<Filters/>
					<div className={s.content}>
						<div className={s.header}>
							<Select
								defaultValue={options[0]}
								onChange={setSelectedOption}
								options={options}
								isSearchable={false}
								components={{
									DropdownIndicator: () => <IconChevronDown size={18}/>
								}}
								styles={{
									control: (baseStyles) => ({
										...baseStyles,
										borderColor: '#E9EAEA',
										borderRadius: 8,
										minHeight: 48,
										paddingLeft: 16,
										paddingRight: 16
									}),
									singleValue: (baseStyles) => ({
										...baseStyles,
										padding: 0
									}),
									valueContainer: (baseStyles)=> ({
										...baseStyles,
										padding: 0,
										paddingRight: 8
									}),
									indicatorSeparator: () => ({
										display: 'none',
									}),
									dropdownIndicator: (baseStyles) => ({
										...baseStyles,
										padding: 0,
									}),
								}}
							/>
							<span>
								Найдено: 4,521
							</span>
						</div>
						<ChannelCard  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuK21PMfMcKphNlwfyUbDoCCZyGxH-a9gnfA&usqp=CAU" 
													title="Marvel / DC: Geek Movies" type="Фильмы и сериалы" 
													desc="Обновлён рекламный контакт: @paprikamedia <br> Мы на YT - https://www.youtube.com/@MarvelDCRU" 
													subscribers="35500" postReach="12551" er="36" cpv="19" price={8500} formats={['Нативная', 'Нативная']}/>
						<ChannelCard  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuK21PMfMcKphNlwfyUbDoCCZyGxH-a9gnfA&usqp=CAU" 
													title="Marvel / DC: Geek Movies" type="Фильмы и сериалы" 
													desc="Обновлён рекламный контакт: @paprikamedia <br> Мы на YT - https://www.youtube.com/@MarvelDCRU" 
													subscribers="35500" postReach="12551" er="36" cpv="19" price={8500} formats={['Нативная', 'Нативная']}/>
						<ChannelCard  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuK21PMfMcKphNlwfyUbDoCCZyGxH-a9gnfA&usqp=CAU" 
													title="Marvel / DC: Geek Movies" type="Фильмы и сериалы" 
													desc="Обновлён рекламный контакт: @paprikamedia <br> Мы на YT - https://www.youtube.com/@MarvelDCRU" 
													subscribers="35500" postReach="12551" er="36" cpv="19" price={8500} formats={['Нативная', 'Нативная']}/>
						<ChannelCard  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuK21PMfMcKphNlwfyUbDoCCZyGxH-a9gnfA&usqp=CAU" 
													title="Marvel / DC: Geek Movies" type="Фильмы и сериалы" 
													desc="Обновлён рекламный контакт: @paprikamedia <br> Мы на YT - https://www.youtube.com/@MarvelDCRU" 
													subscribers="35500" postReach="12551" er="36" cpv="19" price={8500} formats={['Нативная', 'Нативная']}/>
					</div>
				</div>
			</div>
		</div>
	)
}
