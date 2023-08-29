// ArticleList/index.jsx
// import styles from './index.module.scss';

import { useNavigate } from "react-router-dom";

const ArticleList = () => {
  const navigate = useNavigate();
  return (
    <div>
      这里是articleList页面
      <ul>
        <li onClick={() => navigate("/articleList/1?author=jack&age=18")}>
          文章1
        </li>
        <li onClick={() => navigate("/articleList/2")}>文章2</li>
        <li onClick={() => navigate("/articleList/3")}>文章3</li>
      </ul>
    </div>
  );
};

export default ArticleList;
