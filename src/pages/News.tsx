import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Modal,
  Spin,
  Typography,
  Flex,
} from "antd";

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
  addNewArticleRequest,
  getNewsStart,
  searchArticlesRequest,
  updateArticleRequest,
} from "../redux/features/news/slice";
import { IGetNewsData } from "../types/news";
import { memorizedFibonacci } from "../utils/fibonachi";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "../components/newsCard";
import NewsForm from "../components/newsForm";
import "./style.scss";

const { Title } = Typography;

const News = () => {
  const [openAddNews, setOpenAddNews] = useState(false);
  const [editedArticle, setEditedArticle] = useState<IGetNewsData | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(9);

  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsStart());
  }, [dispatch]);

  const [form] = Form.useForm();

  const loadMoreArticles = () => {
    if (articles.length > visibleArticles) {
      setVisibleArticles((prev) => prev + 9);
    }
  };

  const handleClosedAddNews = () => {
    setOpenAddNews(false);
    form.resetFields();
  };

  const handleOpenAddNews = () => {
    setOpenAddNews(true);
  };

  const onAddNewsFormFinish = (values: IGetNewsData) => {
    dispatch(
      addNewArticleRequest({
        ...values,
        fibonacciNumber: memorizedFibonacci(Number(values.fibonacciNumber)),
      })
    );
    setOpenAddNews(false);
    form.resetFields();
  };

  const handleClosedEditNews = () => {
    setEditedArticle(null);
    form.resetFields();
  };

  const handleOpenEditNews = (article: IGetNewsData) => {
    setEditedArticle(article);
  };

  const onEditFormFinish = (values: IGetNewsData) => {
    dispatch(
      updateArticleRequest({
        ...editedArticle,
        ...values,
        fibonacciNumber: memorizedFibonacci(Number(values.fibonacciNumber)),
      })
    );
    form.resetFields();
    setEditedArticle(null);
  };

  const handleSearchArticle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(searchArticlesRequest(searchValue));
    }
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleResetSearch = () => {
    dispatch(searchArticlesRequest(""));
    setSearchValue("");
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" className="spinner-container">
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Title type="danger">{error}</Title>;
  }

  return (
    <Flex vertical gap={24} className="news-container">
      <Flex justify="end">
        <Button
          type="primary"
          onClick={handleOpenAddNews}
          className="add-button"
        >
          Add news
        </Button>
      </Flex>
      <Flex justify="center" className="search-container">
        <Input
          placeholder="Search news"
          onKeyDown={handleSearchArticle}
          onChange={handleChangeFilter}
          value={searchValue}
        />
        {searchValue && (
          <Button type="text" onClick={handleResetSearch}>
            Reset
          </Button>
        )}
      </Flex>
      <InfiniteScroll
        dataLength={visibleArticles}
        next={loadMoreArticles}
        hasMore={visibleArticles < articles.length}
        loader={
          <Flex
            className="scroll-lader-container"
            align="center"
            justify="center"
          >
            <Spin size="large" />
          </Flex>
        }
        scrollThreshold={0.9}
        scrollableTarget="scrollableDiv"
      >
        <Row gutter={[16, 16]} className="cards-container">
          {articles?.slice(0, visibleArticles).map((article) => (
            <Col span={8} key={article.id}>
              <NewsCard article={article} openEditModal={handleOpenEditNews} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      <Modal
        centered
        footer={false}
        title="Add News"
        open={openAddNews}
        onCancel={handleClosedAddNews}
        width="60vw"
      >
        <Form
          layout="vertical"
          name="modalForm"
          onFinish={onAddNewsFormFinish}
          form={form}
        >
          <NewsForm editedArticle={null} closedModal={handleClosedAddNews} />
        </Form>
      </Modal>

      <Modal
        centered
        footer={false}
        title="Edit News"
        open={!!editedArticle}
        onCancel={handleClosedEditNews}
        width="60vw"
      >
        <Form
          layout="vertical"
          name="modalForm"
          onFinish={onEditFormFinish}
          form={form}
        >
          <NewsForm
            closedModal={handleClosedEditNews}
            editedArticle={editedArticle}
          />
        </Form>
      </Modal>
    </Flex>
  );
};

export default News;
