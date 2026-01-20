import React, { useState } from 'react'
import s from './Filters.module.scss'
import { RangeInputs } from './RangeInputs';
import { Button } from '../Shared/Button/Button';
import { IconReload } from '@tabler/icons-react';
import { RangeSlider } from './RangeSlider';
import { Select } from '../Shared/Select/Select';
import { useAllChannelsTags } from '../../hooks/useAllChannelsTags';
import { useAllDurations } from '../../hooks/durations';
import { transformDuration } from '../../helpers/transformDuratuin';

export const filterSubsScales = [
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
]

export const filterChannelTypes = [
	{value: 0, label: "Юмор и развлечения"},
	{value: 1, label: "Шок-контент"},
	{value: 2, label: "Видео и фильмы"},
	{value: 3, label: "Экономика"},
	{value: 4, label: "Познавательное"},
	{value: 5, label: "Транспорт"},
	{value: 6, label: "Технологии"},
	{value: 7, label: "Лингвистика"},
	{value: 8, label: "Дизайн"},
	{value: 9, label: "Картинки и фото"},
]

export const Filters = ({onFilterSubmit, maxSubscribersNumber}) => {
	const [minSubscribers, set_minSubscribers] = useState(0);
	const [maxSubscribers, set_maxSubscribers] = useState(maxSubscribersNumber);
	const [minPostReach, set_minPostReach] = useState();
	const [maxPostReach, set_maxPostReach] = useState();
	const [minCPV, set_minCPV] = useState();
	const [maxCPV, set_maxCPV] = useState();
	const [minPrice, set_minPrice] = useState();
	const [maxPrice, set_maxPrice] = useState();

	const [isSended, set_isSended] = useState(false)
	const [selectedTypes, set_selectedTypes] = useState([])
	const [selectedDurations, set_selectedDurations] = useState([])
	const {data: tags} = useAllChannelsTags()
	const {data: durations} = useAllDurations()

	const reset = () => {
		set_minSubscribers(0)
		set_maxSubscribers(maxSubscribersNumber)
		set_minPostReach(undefined)
		set_maxPostReach(undefined)
		set_minCPV(undefined)
		set_maxCPV(undefined)
		set_minPrice(undefined)
		set_maxPrice(undefined)
		set_selectedDurations([])
		set_selectedTypes([])
	}

	const submitHandler = () => {
		set_isSended(true)
		
		onFilterSubmit({
				minSubscribers: minSubscribers,
				maxSubscribers: maxSubscribers,
				minPostReach: minPostReach,
				maxPostReach: maxPostReach,
				minCPV: minCPV,
				maxCPV: maxCPV,
				minPrice: minPrice,
				maxPrice: maxPrice,
				selectedTypes: selectedTypes?.length > 0 ? selectedTypes?.map(el => el?.value) : [],
				selectedDurations: selectedDurations?.length > 0 ? selectedDurations?.map(el => el?.value) : [],
		})
		set_isSended(false)
	}

	return (
    <div className={s.wrapper}>
      <h2>Фильтры</h2>
      <span className={s.line}></span>
      <div className={s.inputsGroup}>
        <h5>Подписчики</h5>
        <RangeSlider
          scales={filterSubsScales}
          maxSubscribersNumber={maxSubscribersNumber}
          minValue={minSubscribers}
          maxValue={maxSubscribers}
          set_minValue={set_minSubscribers}
          set_maxValue={set_maxSubscribers}
        />
        <RangeInputs
          minValue={minSubscribers}
          maxValue={maxSubscribers}
          minOnChange={set_minSubscribers}
          maxOnChange={set_maxSubscribers}
        />
      </div>
      {tags?.length > 0 && (
        <Select
          className={s.select}
          options={tags?.map((tag) => ({ value: tag, label: tag }))}
          setSelectedOption={set_selectedTypes}
          isMulti
          closeMenuOnSelect={false}
          fullWidth
          placeholder="Тематика канала"
        />
      )}
      {durations?.length > 0 && (
        <Select
          className={s.select}
          options={durations?.map((duration) => ({
            value: duration?.id,
            label: `Размещение ${transformDuration(duration)}`,
          }))}
          setSelectedOption={set_selectedDurations}
          isMulti
          closeMenuOnSelect={false}
          fullWidth
          placeholder="Формат размещения"
        />
      )}
      <div className={s.inputsGroup}>
        <h5>Средний охват поста</h5>
        <RangeInputs
          minValue={minPostReach}
          maxValue={maxPostReach}
          minOnChange={set_minPostReach}
          maxOnChange={set_maxPostReach}
        />
      </div>
      <div className={s.inputsGroup}>
        <h5>
          CPV <span>(цена за просмотр)</span>
        </h5>
        <RangeInputs
          minValue={minCPV}
          maxValue={maxCPV}
          minOnChange={set_minCPV}
          maxOnChange={set_maxCPV}
        />
      </div>
      <div className={s.inputsGroup}>
        <h5>Стоимость рекламы</h5>
        <RangeInputs
          minValue={minPrice}
          maxValue={maxPrice}
          minOnChange={set_minPrice}
          maxOnChange={set_maxPrice}
        />
      </div>
      <span className={s.line}></span>
      <Button
        className={s.resetBtn}
        label={"Сбросить"}
        theme="secondary"
        leftIcon={<IconReload size={18} />}
        onClick={reset}
      />
      <Button
        className={s.btn}
        label={"Применить"}
        fetching={isSended}
        onClick={submitHandler}
      />
    </div>
  );
}
