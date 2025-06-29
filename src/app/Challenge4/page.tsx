import UserListAxios from "@/components/UserListAxios";

export default function Challenge2Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー一覧 絞りこみ検索 axios使用
      </h2>
      <UserListAxios />
    </div>
  );
}
