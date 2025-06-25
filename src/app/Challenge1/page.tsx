import UserListBtn from "@/components/UserListBtn";

export default function Challenge1Page() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-medium text-gray-600 text-6xl m-3">
        ユーザー一覧取得ボタンで
      </h2>
      <UserListBtn />
    </div>
  );
}
