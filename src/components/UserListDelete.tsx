"use client";
import axios from "axios";
import { FormEvent, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function UserListDelete() {
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
        },
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

  const deletePost = async (id: number) => {
    if (window.confirm("投稿を削除します")) {
      try {
        const res = await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );
        console.log(res);
        setPostList((prev) => prev.filter((post) => post.userId !== id));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-6 text-2xl">なんか投稿しよう</h3>
      <form className="w-md" onSubmit={submitForm}>
        <p className="mb-6 flex items-start">
          <label htmlFor="title" className="whitespace-nowrap">
            タイトル：
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full rounded-2xl border-2 border-gray-500 px-3 py-1.5"
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
            className="min-h-[200px] w-full rounded-2xl border-2 border-gray-500 px-3 py-1.5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </p>
        <div className="flex justify-end">
          <button
            className="mt-6 rounded-md bg-blue-400 px-6 py-3 hover:opacity-70"
            type="submit"
          >
            投稿する
          </button>
        </div>
      </form>
      {error && <p className="mb-6s mt-6 text-red-400">{error}</p>}
      <div>
        <h3>投稿リスト</h3>
        {postList && (
          <ul className="flex flex-col gap-3">
            {postList.map((post) => (
              <li key={post.id} className="flex items-start gap-x-5">
                <div>
                  <p>userId: {post.userId}</p>
                  <p>タイトル：{post.title}</p>
                  <p>内容：{post.body}</p>
                </div>
                <button
                  className="rounded-2xl border-2 border-solid border-zinc-400 px-4 py-2 hover:bg-red-400"
                  onClick={() => deletePost(post.userId)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
