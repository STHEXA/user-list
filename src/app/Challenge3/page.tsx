import UserListSearch from "@/components/UserListSearch";

export default function Challenge2Page() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-medium text-gray-600 text-6xl m-3">
        ユーザー一覧 絞りこみ検索
      </h2>
      <UserListSearch />
    </div>
  );
}
