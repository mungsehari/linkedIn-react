import classes from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.root}>
      <img src="/logo.svg" alt="Loading..." />
      <div className={classes.container}>
        <div className={classes.content}></div>
      </div>
    </div>
  );
};

export default Loader;
