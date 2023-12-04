// ArticleList/index.jsx
import { useState, useEffect } from "react";
import { Table } from "antd";
import styles from "./index.module.less";
import { dataSource } from "./const";
// import { useNavigate } from "react-router-dom";

const ArticleList = () => {
  const [data, setData] = useState([]);

  const formatRender = (text: string | number) => (text ? text : "-");
  const columns = [
    {
      title: "日期",
      dataIndex: "date",
      render: formatRender,
    },
    {
      title: "名称",
      dataIndex: "name",
      render: formatRender,
    },
    {
      title: "届/个",
      dataIndex: "times",
      render: formatRender,
    },
    {
      title: "主题",
      dataIndex: "slogan",
      render: formatRender,
    },
    {
      title: "地点",
      dataIndex: "location",
      render: formatRender,
    },
  ];

  useEffect(() => {
    const lists = dataSource.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    });
    setData(lists);
  });
  return (
    <div className={styles.tableContainer}>
      <Table rowKey="key" dataSource={data} columns={columns} />
    </div>
  );
};

export default ArticleList;
