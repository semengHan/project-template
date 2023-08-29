import { Button } from "antd";
import styles from "./index.module.less";
import { useBearStore } from "@/store/index";

const Home = () => {
  const { bears, increase } = useBearStore();

  return (
    <div className={styles.home}>
      <div className={styles.header}>header</div>
      <div className={styles.content}>
        <span>{bears}</span>
        <Button type="primary" onClick={increase}>
          Add Bear
        </Button>
      </div>
    </div>
  );
};

export default Home;
