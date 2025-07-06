"use client";
import { FormEvent, useState } from "react";
import type { Post } from "../types/post";
import { postContent, postDelete, postUpdate } from "@/api/postApi";
import styles from "../app/Challenge7/page.module.css";
import PostItem from "./PostItem";

export default function UserListPatch() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [postList, setPostList] = useState<Post[]>([
    {
      id: 1,
      title: "初期投稿",
      body: "初期投稿確認用",
      userId: 666,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<number>();
  const [changeTitle, setChangeTitle] = useState<string>("");
  const [changeContent, setChangeContent] = useState<string>("");

  const submitForm = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        return setError("タイトルと内容は必須です");
      }
      const postData = await postContent(title, content, userId);
      setPostList([postData, ...postList]);
      setUserId((prev) => prev + 1);
      //入力フォームの値をリセットする
      setTitle("");
      setContent("");
      setError("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //削除API
  const deletePost = async (id: number) => {
    if (window.confirm("投稿を削除します")) {
      setLoading(true);
      try {
        const deleteData = await postDelete(id);
        console.log(deleteData);
        setPostList((prev) => prev.filter((post) => post.userId !== id));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  //更新API
  const updatePost = async (userId: number) => {
    setLoading(true);
    try {
      const updateDate = await postUpdate(userId, changeTitle, changeContent);
      console.log(updateDate);
      setPostList((prev) => {
        const newList = prev.map((item) =>
          item.userId === userId
            ? { ...item, title: changeTitle, body: changeContent }
            : item,
        );
        return newList;
      });
      setIsEdit(undefined);
      setChangeTitle("");
      setChangeContent("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-6 text-2xl">なんか投稿しよう</h3>
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
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
              />
            </p>
            <div className="flex justify-end">
              <button
                className="mt-6 rounded-md bg-blue-400 px-6 py-3 hover:opacity-70"
                type="submit"
                disabled={loading}
              >
                投稿する
              </button>
            </div>
          </form>
          <div>
            <h3>投稿リスト</h3>
            <ul className="flex flex-col gap-3">
              {postList.map((post) => (
                <PostItem
                  key={post.userId}
                  post={post}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  deletePost={deletePost}
                  updatePost={updatePost}
                  loading={loading}
                  changeTitle={changeTitle}
                  setChangeTitle={setChangeTitle}
                  changeContent={changeContent}
                  setChangeContent={setChangeContent}
                />
              ))}
            </ul>
          </div>
        </>
      )}
      {error && <p className="mb-6s mt-6 text-red-400">{error}</p>}
    </div>
  );
}
