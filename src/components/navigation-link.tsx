import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

export const NavigationLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & PropsWithChildren
>((props) => {
  return (
    <Link {...props} className="navigation-link">
      {props.children}
    </Link>
  );
});

NavigationLink.displayName = "Navigation Link";
