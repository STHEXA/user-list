import UserList from "@/components/UserList";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-medium text-gray-600 text-6xl m-3">
        ユーザー一覧取得
      </h2>
      <UserList />
    </div>
  );
}
