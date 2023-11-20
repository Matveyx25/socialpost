import React from 'react';
import s from './Pagination.module.scss'
import { DOTS, usePagination } from '../../../hooks/usePagintaion';
import classNames from 'classnames';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
		setSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
		onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
		onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
		<div className={s.paginationWrapper}>
			<ul
				className={classNames(s.paginationContainer, { [className]: className })}
			>
				<li
					className={classNames(s.arrow, currentPage === 1 && s.disabled)}
					onClick={onPrevious}
				>
					<IconChevronLeft/>
					Предыдущая
				</li>
				{paginationRange.map(pageNumber => {
					if (pageNumber === DOTS) {
						return <li className={classNames(s.paginationItem, s.dots)}>&#8230;</li>;
					}
			
					return (
						<li
							className={classNames(s.paginationItem, pageNumber === currentPage && s.selected)}
							onClick={() => onPageChange(pageNumber)}
						>
							{pageNumber}
						</li>
					);
				})}
				<li
					className={classNames(s.arrow, currentPage === lastPage && s.disabled)}
					onClick={onNext}
				>
					Следующая
					<IconChevronRight/>
				</li>
			</ul>
			<div className={s.pageSizeWrapper}>
				<p>
					Элементов на странице:
				</p>
				<ul>
					<li className={classNames(s.pageSizeItem, pageSize === 30 && s.selected)} onClick={() => setSize(30)}>
						30
					</li>
					<li className={classNames(s.pageSizeItem, pageSize === 60 && s.selected)} onClick={() => setSize(60)}>
						60
					</li>
					<li className={classNames(s.pageSizeItem, pageSize === 90 && s.selected)} onClick={() => setSize(90)}>
						90
					</li>
					<li className={classNames(s.pageSizeItem, pageSize === 120 && s.selected)} onClick={() => setSize(120)}>
						120
					</li>
				</ul>
			</div>
		</div>
  );
};
