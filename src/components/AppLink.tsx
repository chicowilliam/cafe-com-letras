import { Link, type LinkProps } from "react-router-dom";

export function AppLink(props: Omit<LinkProps, "viewTransition">) {
  return <Link {...props} viewTransition />;
}
