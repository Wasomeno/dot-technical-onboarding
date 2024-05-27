import React from "react";

import clsx from "clsx";

import "./style.css";

export const Logo: React.FC<{ size?: "large" | "medium" | "small" }> = ({
  size = "medium",
}) => {
  const variant: Record<typeof size, string> = {
    large: "logo__large",
    medium: "logo__medium",
    small: "logo__small",
  };

  return <span className={clsx("logo", variant[size])}>DOTFLIX</span>;
};
