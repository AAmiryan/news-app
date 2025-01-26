import { IPage } from "../types";

export const pages: IPage[] = [
  { title: "Home", path: "/", private: "/private" },
  { title: "News", path: "/news", private: "/private/news" },
  { title: "Profile", path: "/profile" },
];
