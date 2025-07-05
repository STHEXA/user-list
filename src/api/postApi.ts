import axios from "axios";
import type { Post } from "../types/post";

export const postContent = async (
  title: string,
  content: string,
  userId: number,
) => {
  const res = await axios.post<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title: title,
      body: content,
      userId: userId,
    },
  );
  return res.data;
};

export const postDelete = async (id: number) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  return res.data;
};

export const postUpdate = async (
  userId: number,
  changeTitle: string,
  changeContent: string,
) => {
  const res = await axios.patch(
    `https://jsonplaceholder.typicode.com/posts/${userId}`,
    {
      title: changeTitle,
      body: changeContent,
    },
  );
  return res.data;
};
