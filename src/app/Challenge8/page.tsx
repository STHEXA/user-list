import UserListPartSplit from "@/components/UserListPartSplit";

export default function Challenge8Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー投稿　投稿一覧箇所を別コンポーネントで作成
      </h2>
      <UserListPartSplit />
    </div>
  );
}
