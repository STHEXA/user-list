import UserListBtnLimit from "@/components/UserListBtnLimit";

export default function Challenge2Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー一覧取得ボタンで
      </h2>
      <UserListBtnLimit />
    </div>
  );
}
