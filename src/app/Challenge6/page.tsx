import UserListDelete from "@/components/UserListDelete";

export default function Challenge6Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー投稿　POST
      </h2>
      <UserListDelete />
    </div>
  );
}
