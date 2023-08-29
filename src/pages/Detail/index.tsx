// Detail/index.jsx
// import styles from "./index.module.scss";

import { useParams, useSearchParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  console.log("searchParams", searchParams.getAll("author")[0]); // jack
  return <div>{`这里是文章${params.id}`}</div>;
};

export default Detail;
