import React, { useEffect, useState } from "react";
import s from "./ChannelCard.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  IconChevronDown,
  IconChevronUp,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { Button } from "../Shared/Button/Button";
import { NavLink } from "react-router-dom";

export const ChannelCard = ({ key, updateCart, cart, channel, formats }) => {
  const {
    name,
    id,
    tag,
    description,
    subscribersCount,
    averagePostReach,
    costPerView,
    engagementRate,
    imageUrl,
  } = channel;

  const [inCart, set_inCart] = useState(
    cart && cart?.find((el) => el.id === id)
  );
  const [selectedFormat, setSelectedFormat] = useState(
    inCart
      ? {
          value: inCart.format,
          label: formats.find((el) => el.value === inCart.format)?.label,
        }
      : { value: formats[0]?.value, label: formats[0]?.label }
  );

  const addToCart = () => {
    set_inCart(true);
    updateCart([...cart, { id, count: 1, format: selectedFormat.value, price: formats.find((el) => el.value === selectedFormat.value)?.price}]);
  };

  const removeFromCart = () => {
    set_inCart(false);
    updateCart(cart?.filter((el) => el.id !== id));
  };

  useEffect(() => {
    set_inCart(cart && cart?.find((el) => el.id === id));
  }, [cart]);

  useEffect(() => {
    setSelectedFormat(
      inCart
        ? {
            value: inCart.format,
            label: formats.find((el) => el.value === inCart.format)?.label,
          }
        : { value: formats[0]?.value, label: formats[0]?.label }
    );
  }, [inCart]);

  return (
    <div className={s.wrapper} key={key}>
      <div className={s.flex}>
        <div className={s.mobileFlex}>
          <NavLink className={s.img} to={"/channel/" + id}>
            <img
              src={imageUrl ? imageUrl : "/images/channel-without-image.svg"}
              alt=""
            />
          </NavLink>
          <div className={s.content}>
            <div className={s.titleFlex}>
              <NavLink className={s.title} to={"/channel/" + id}>
                {name}
              </NavLink>
              <>
  							{channel?.tag && 
  								channel?.tag.split(';').map(el => 
  								<span>{el}</span>)}
  						</>
            </div>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
        {formats.find((el) => el.value === selectedFormat.value)?.price ? <div className={s.mobileBtns}>
          <Dropdown
            value={selectedFormat}
            options={formats.map((el) => ({
              value: el.value,
              label: el.label,
            }))}
            className={s.formats}
            onChange={setSelectedFormat}
            arrowClosed={<IconChevronDown size={18} />}
            arrowOpen={<IconChevronUp size={18} />}
          />
          {inCart ? (
            <Button
              className={s.removeBtn}
              label={"Убрать"}
              leftIcon={<IconX size={18} />}
              onClick={removeFromCart}
            />
          ) : (
            <Button
              className={s.button}
              label={(
                formats.find((el) => el.value === selectedFormat.value)?.price +
                ""
              )
                .replace(/\s/g, "")
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")}
              leftIcon={<IconShoppingCart size={18} />}
              onClick={addToCart}
            />
          )}
        </div> : <></>}
      </div>
      <div className={s.stats}>
        <div>
          <span>Подписчики</span>
          <p>
            {(subscribersCount + "")
              ?.replace(/\s/g, "")
              ?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")}
          </p>
        </div>
        <div>
          <span>Средний охват поста</span>
          <p>
            {(averagePostReach + "")
              ?.replace(/\s/g, "")
              ?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")}
          </p>
        </div>
        <div>
          <span>ER</span>
          <p>{engagementRate}%</p>
        </div>
        <div>
          <span>CPV</span>
          <p>{costPerView}₽</p>
        </div>
      </div>
    </div>
  );
};
