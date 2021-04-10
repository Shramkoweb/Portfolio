import React, { PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "./styles/typography.module.scss";

export interface TypographyProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "b" | "span";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  color?: "initial" | "inherit" | "primary" | "secondary" | "error";
  weight?: "normal" | "bold";
}

function Typography(props: PropsWithChildren<TypographyProps>): JSX.Element {
  const {tag = "p", align = "inherit", color = "initial", weight = 400, children} = props;

  const Tag = tag;

  const rootClassName = classNames(styles.typography, {
    [styles[`typography_color_${color}`]]: color,
    [styles[`typography_align_${align}`]]: align,
    [styles[`typography_weight_${weight}`]]: weight,
  });

  return (
    <Tag className={rootClassName}>{children}</Tag>
  );
}

export default Typography;
