import { Button, Flex, Image, Typography } from "antd";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { INewsCardProps } from "../../types/news";
import { useAppDispatch } from "../../utils/hooks";
import { deleteArticleRequest } from "../../redux/features/news/slice";
import { memorizedIsPrime } from "../../utils/fibonachi";
import CheckIcon from "../../assets/icons/check.svg";
import "./style.scss";

const { Text, Title } = Typography;

const NewsCard: React.FC<INewsCardProps> = ({ openEditModal, article }) => {
  const dispatch = useAppDispatch();

  const handleDeleteArticle = () => {
    dispatch(deleteArticleRequest(article.id));
  };

  return (
    <Flex vertical className="container">
      <Image
        preview={false}
        src={article.image}
        height={250}
        className="image"
      />
      <Flex vertical className="text-container">
        <Flex gap={16} align="center">
          <Title level={4} className="m-t">
            {article.title}
          </Title>
          <Title className="m-t" level={4}>
            Fibonacci- {article.fibonacciNumber}
          </Title>
          {memorizedIsPrime(article.fibonacciNumber) && <CheckIcon />}
        </Flex>
        <Text>{article.description}</Text>
        <Flex>
          <Button type="text" onClick={() => openEditModal(article)}>
            <EditIcon />
          </Button>
          <Button type="text" onClick={handleDeleteArticle}>
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewsCard;
