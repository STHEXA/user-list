"use client";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const getFetchData = async () => {
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
    getFetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <p className="text-4xl mt-4 mb-4">APIで取得したユーザー一覧です。</p>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
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
      )}
    </div>
  );
}
