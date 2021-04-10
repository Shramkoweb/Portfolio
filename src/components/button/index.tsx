import React, { PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "./button.module.scss";

export interface ButtonProps {
  height?: "small" | "medium";
  width?: "small" | "wide";
  theme?: "main" | "secondary" | "white";
  type?: "button" | "submit" | "reset";
}

function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
  const {
    type = "button",
    height = "small",
    theme = "main",
    width = "wide",
    children,
  } = props;

  const rootClass = classNames(styles.button, {
    [styles[`button_width_${width}`]]: width,
    [styles[`button_theme_${theme}`]]: theme,
    [styles[`button_height_${height}`]]: height,
  });

  return (
    <button type={type} className={rootClass}>
      {children}
    </button>
  );
}

export default Button;
