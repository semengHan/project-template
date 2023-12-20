import { Button } from "antd";

import { useBearStore } from "@/store/index";
import Son from "./Son";
import styles from "./index.module.less";

const Zustand = () => {
  const { bears, increase } = useBearStore();

  return (
    <div className={styles.content}>
      <span className={styles.count}>{bears}</span>
      <Button type="primary" onClick={() => increase(2)}>
        +++Add
      </Button>

      <Son />
    </div>
  );
};

export default Zustand;
