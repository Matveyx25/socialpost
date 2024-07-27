import React, { useState } from 'react'
import { Loader } from '../../../Shared/Loader/Loader'
import s from './post-by-advertiser.module.scss'
import { Pagination } from '../../../Shared/Pagination/Pagination';
import { useCMPChannels } from '../../../../hooks/useCMPChannels';

export const CPMRequests = ({postId}) => {
	const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);

  const { data: channels, isFetched } = useCMPChannels(postId, {
    _start: (page - 1) * 30,
    _end: page * 30,
  });

	return (
		<div className={s.tableCard}>
          <div className={s.cardHeader}>
            <span>Показы</span>
          </div>
          <div className={s.line}></div>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Название канала</th>
                  <th>Показы</th>
                </tr>
              </thead>
              <tbody>
                {isFetched ? (
                  channels?.headers["x-total-count"] > 0 ? (
                    channels?.data.map((el) => (
                      <tr key={el.id}>
                        <td>
                          <div className={s.center}>
                            <div className={s.mainInfo}>
                              <div className={s.img}>
                                <img
                                  src={
                                    el?.channelImageUrl
                                      ? el?.channelImageUrl
                                      : "/images/channel-without-image.svg"
                                  }
                                  alt=""
                                />
                              </div>
                              {el.channelName}
                            </div>
                          </div>
                        </td>
												<td>
													<div className={s.center}>{el?.views}</div>
												</td>
                      </tr>
                    ))
                  ) : (
                    <div className={s.emptyMessage}>
                    	Показов с таким статусом пока нет
                    </div>
                  )
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
          {channels?.headers["x-total-count"] && (
            <Pagination
              currentPage={page}
              totalCount={+channels?.headers["x-total-count"]}
              pageSize={size}
              setSize={setSize}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
	)
}
