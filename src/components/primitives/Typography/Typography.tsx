import React from "react";
import { ITypographyProps } from "./types";
import classNames from "classnames";
import "../../../styles/primitives/_typography.scss";

const Typography: React.FC<ITypographyProps> = ({
  className = "",
  children,
  variant = "h1",
}) => {
  return (
    <h1 className={classNames(`typography typography--${variant}`, className)}>
      {children}
    </h1>
  );
};

export default Typography;
