"use client";
import axios from "axios";
import { FormEvent, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function UserListPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [postList, setPostList] = useState<Post[]>([]);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        return setError("タイトルと内容は必須です");
      }
      const res = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: content,
          userId: userId,
        }
      );
      setPostList([res.data, ...postList]);
      setUserId((prev) => prev + 1);
      //入力フォームの値をリセットする
      setTitle("");
      setContent("");
      setError("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl mb-6">なんか投稿しよう</h3>
      <form className="w-md" onSubmit={submitForm}>
        <p className="flex items-start mb-6">
          <label htmlFor="title" className="whitespace-nowrap">
            タイトル：
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-gray-500 rounded-2xl border-2 w-full px-3 py-1.5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p className="flex items-start">
          <label htmlFor="content" className="whitespace-nowrap">
            内容：
          </label>
          <textarea
            name="content"
            id="content"
            className="border-gray-500 rounded-2xl border-2 w-full min-h-[200px] px-3 py-1.5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-400 py-3 px-6 mt-6 rounded-md hover:opacity-70"
            type="submit"
          >
            投稿する
          </button>
        </div>
      </form>
      {error && <p className="mt-6 mb-6s text-red-400">{error}</p>}
      <div>
        <h3>投稿リスト</h3>
        {postList && (
          <ul className="flex flex-col gap-3">
            {postList.map((post) => (
              <li key={post.userId}>
                <p>userId: {post.userId}</p>
                <p>タイトル：{post.title}</p>
                <p>内容：{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
