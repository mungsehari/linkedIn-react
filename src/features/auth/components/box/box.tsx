import { ReactNode } from "react";

import classes from "../box/box.module.scss";
const Box = ({ children }: { children: ReactNode }) => {
  return <div className={classes.root}>{children}</div>;
};

export default Box;
