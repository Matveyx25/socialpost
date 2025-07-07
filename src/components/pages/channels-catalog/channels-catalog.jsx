import React, { useEffect, useState } from "react";
import s from "./channels-catalog.module.scss";
import { Filters } from "../../Filters/Filters";
import { ChannelCard } from "../../ChannelCard/ChannelCard";
import { Select } from "../../Shared/Select/Select";
import { useMediaQuery } from "react-responsive";
import { FilterModal } from "../../Filters/FilterModal";
import { useChannels } from "../../../hooks/useChannels";
import { Loader } from "../../Shared/Loader/Loader";
import { useCart } from "../../../hooks/useCart";
import { useUpdateCart } from "../../../hooks/useUpdateCart";
import { transformDuration } from "../../../helpers/transformDuratuin";

const options = [
  {
    value: {
      _order: "DESC",
      _sort: "subscribersCount",
    },
    label: "Подписчиков: Больше",
  },
  {
    value: {
      _order: "ASC",
      _sort: "subscribersCount",
    },
    label: "Подписчиков: Меньше",
  },
  {
    value: {
      _order: "DESC",
      _sort: "averagePostReach",
    },
    label: "Охват поста: Больше",
  },
  {
    value: {
      _order: "ASC",
      _sort: "averagePostReach",
    },
    label: "Охват поста: Меньше",
  },
  {
    value: {
      _order: "DESC",
      _sort: "costPerView",
    },
    label: "Цена: Больше",
  },
  {
    value: {
      _order: "ASC",
      _sort: "costPerView",
    },
    label: "Цена: Меньше",
  },
];

export const ChannelsCatalog = () => {
  const { data: cart } = useCart();
  const { mutate: updateCart } = useUpdateCart();

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [modalIsOpen, setModalIsOpen] = useState("");
  const [filters, setFilters] = useState(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 820px)",
  });

  const {
    data: channels,
    isFetched,
    refetch,
  } = useChannels({ ...filters, ...selectedOption.value });

  const onFilterSubmit = (f) => {
    setFilters({
      subscribers_min: f?.minSubscribers,
      subscribers_max: f?.maxSubscribers,
      average_post_reach_min: f?.minPostReach,
      average_post_reach_max: f?.maxPostReach,
      cost_per_view_min: f?.minCPV,
      cost_per_view_max: f?.maxCPV,
      price_min: f?.minPrice,
      price_max: f?.maxPrice,
    });
    refetch();
  };

  return (
    <div className={s.wrapper}>
      {isMobile && (
        <FilterModal
          isOpen={modalIsOpen}
          setOpen={setModalIsOpen}
          onFilterSubmit={onFilterSubmit}
          maxSubscribersNumber={100000}
        />
      )}
      <div className="container">
        <h2 className={s.title}>Каталог каналов</h2>
        <p className={s.subtitle}>
          {(channels?.headers["x-total-count"] + "").replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1,"
          )}{" "}
          каналов
        </p>
        <div className={s.flex}>
          {isMobile || (
            <Filters
              onFilterSubmit={onFilterSubmit}
              maxSubscribersNumber={100000}
            />
          )}
          <div className={s.content}>
            <div className={s.header}>
              {isMobile && (
                <button
                  className={s.filterBtn}
                  onClick={() => setModalIsOpen("filter-modal")}
                >
                  Фильтры
                </button>
              )}
              <Select
                defaultValue={options[0]}
                options={options}
                setSelectedOption={setSelectedOption}
              />
              <span>
                Найдено:{" "}
                {(channels?.headers["x-total-count"] + "").replace(
                  /(\d)(?=(\d\d\d)+([^\d]|$))/g,
                  "$1,"
                )}
              </span>
            </div>
            {isFetched ? (
              channels?.data?.map((channel) => {
                const prices = channel?.prices?.map((el) => ({
                  enabled: true,
                  label: transformDuration(el?.duration),
                  value: el.duration.id,
                  price: el.price,
                }));

                const formats = [
                  {
                    enabled: channel?.nativePostPriceEnabled,
                    label: "Нативный",
                    value: null,
                    price: channel?.nativePostPrice,
                  },
                  ...prices,
                ].filter((el) => el.enabled);

                return (
                  <ChannelCard
                    updateCart={updateCart}
                    key={"channel-id-" + channel.id}
                    {...{ channel, cart, formats }}
                  />
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
