export interface IGetNewsData {
  id: string;
  title: string;
  description: string;
  image: string;
  fibonacciNumber: number;
}
export interface INewsFormProps {
  closedModal: () => void;
  editedArticle: IGetNewsData | null;
}
export interface INewsCardProps {
  openEditModal: (article: IGetNewsData) => void;
  article: IGetNewsData;
}

export interface NewsState {
  articles: IGetNewsData[];
  loading: boolean;
  error: string | null;
}
