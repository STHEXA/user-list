"use client";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function UserList() {
  const [userList, setUserList] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getFetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error("ユーザー一覧が取得できませんでした。");
      }
      const data = await res.json();
      setUserList(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={getFetchData} className="rounded-md bg-gray-400 p-2.5">
        ユーザーを取得する
      </button>
      {loading && <p>読込中・・・</p>}
      {error && <p>{error}</p>}
      {userList && (
        <>
          <p className="mt-4 mb-4 text-4xl">APIで取得したユーザー一覧です。</p>
          <ul>
            {userList &&
              userList.map((user) => (
                <li key={user.id}>
                  <p>
                    id: {user.id} / 名前: {user.name} / ユーザー名:{" "}
                    {user.username}
                  </p>
                  <p>メアド：{user.email}</p>
                  <p className="text-2xl">住所</p>
                  <p>郵便番号：{user.address.zipcode}</p>
                  <p>街：{user.address.city}</p>
                  <a
                    href={user.website}
                    className="text-blue-300 hover:opacity-70"
                  >
                    {user.website}
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
