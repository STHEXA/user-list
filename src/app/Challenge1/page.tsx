import UserListBtn from "@/components/UserListBtn";

export default function Challenge1Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー一覧取得ボタンで
      </h2>
      <UserListBtn />
    </div>
  );
}
