import UserListPost from "@/components/UserListPost";

export default function Challenge5Page() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="font-medium text-gray-600 text-6xl m-3">
        ユーザー投稿　POST
      </h2>
      <UserListPost />
    </div>
  );
}
