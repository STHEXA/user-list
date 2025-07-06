import { asyncAwaitFunc, setter } from "./common";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type PostItemProps = {
  post: Post;
  isEdit: number | undefined;
  setIsEdit: setter<number | undefined>;
  changeTitle: string;
  setChangeTitle: setter<string>;
  changeContent: string;
  setChangeContent: setter<string>;
  deletePost: asyncAwaitFunc<number, void>;
  updatePost: asyncAwaitFunc<number, void>;
  loading: boolean;
};
