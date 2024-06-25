import classNames from "classnames";
import { forwardRef } from "react";
import s from '../RichText.module.scss'

export const Menu = forwardRef(
  ({ className, ...props },ref) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={classNames(className, s.toolbar)}
    />
  )
)