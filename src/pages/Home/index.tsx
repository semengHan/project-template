// import { useState, useEffect, useMemo, useCallback } from "react";
// import { Button } from "antd";
import styles from "./index.module.less";
import Map from "@/components/Map";
// import { useBearStore } from "@/store/index";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.header}>React Map Gl</div>
      <div className={styles.content}>
        <Map />
      </div>
    </div>
  );
};

export default Home;
