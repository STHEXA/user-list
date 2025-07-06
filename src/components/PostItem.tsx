import { PostItemProps } from "@/types/post";

export default function PostItem({
  post,
  isEdit,
  setIsEdit,
  deletePost,
  updatePost,
  loading,
  changeTitle,
  setChangeTitle,
  changeContent,
  setChangeContent,
}: PostItemProps) {
  const editPost = (userId: number, title: string, body: string) => {
    setIsEdit(userId);
    setChangeTitle(title);
    setChangeContent(body);
  };

  return (
    <li className="flex items-start gap-x-5">
      <div>
        <p>userId: {post.userId}</p>
        <p>
          タイトル：
          {isEdit === post.userId ? (
            <input
              value={changeTitle}
              className="rounded-2xl border-2 border-gray-500 px-3 py-1.5"
              onChange={(e) => setChangeTitle(e.target.value)}
            />
          ) : (
            post.title
          )}
        </p>
        <p>
          内容：
          {isEdit === post.userId ? (
            <textarea
              value={changeContent}
              className="resize-none rounded-2xl border-2 border-gray-500 px-3 py-1.5"
              onChange={(e) => setChangeContent(e.target.value)}
            />
          ) : (
            post.body
          )}
        </p>
      </div>
      <div className="flex gap-x-3">
        <button
          className="rounded-2xl border-2 border-solid border-zinc-400 px-4 py-2 hover:bg-red-400"
          onClick={() => deletePost(post.userId)}
          disabled={loading}
        >
          ✕
        </button>
        {isEdit === post.userId ? (
          <button
            onClick={() => updatePost(post.userId)}
            className="rounded-2xl border-2 border-solid border-zinc-400 px-4 py-2 hover:bg-blue-400"
            disabled={loading}
          >
            更新する
          </button>
        ) : (
          <button
            onClick={() => editPost(post.userId, post.title, post.body)}
            className="rounded-2xl border-2 border-solid border-zinc-400 px-4 py-2 hover:bg-green-400"
            disabled={loading}
          >
            編集する
          </button>
        )}
      </div>
    </li>
  );
}
