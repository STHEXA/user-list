import UserListPatch from "@/components/UserListPatch";

export default function Challenge7Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-3 text-6xl font-medium text-gray-600">
        ユーザー投稿　POSTの編集
      </h2>
      <UserListPatch />
    </div>
  );
}
