"use client";
import axios from "axios";
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

export default function UserListAxios() {
  const [originalUserList, setOriginalUserList] = useState<User[] | null>(null);
  const [userList, setUserList] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputLimit, setInputLimit] = useState<number>(1);
  const [inputText, setInputText] = useState<string>("");

  const getFetchData = async () => {
    setError(null);
    if (inputLimit < 1 || inputLimit > 10) {
      setError("1〜10の範囲で入力してください");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = res.data;
      setOriginalUserList(data);
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

  const inputSearch = (e: string) => {
    setInputText(e);
    const filterList = originalUserList?.filter((user) => {
      return user.name.toLowerCase().includes(e.toLowerCase());
    });
    setUserList(filterList || []);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>何件取得する？</p>
      <input
        type="number"
        value={inputLimit}
        onChange={(e) => setInputLimit(e.target.valueAsNumber)}
        className="border-2 rounded-md m-4"
      />
      <button onClick={getFetchData} className="p-2.5 bg-gray-400 rounded-md">
        {inputLimit}件のユーザーを取得する
      </button>
      <p className="mt-3">名前で絞り込み</p>
      <input
        type="text"
        onChange={(e) => inputSearch(e.target.value)}
        value={inputText}
        className="border-2 rounded-md m-4"
        placeholder="Glenna Reichert"
      />
      {loading && <p>読込中・・・</p>}
      {error && <p>{error}</p>}
      {userList && (
        <>
          <p className="text-4xl mt-4 mb-4">APIで取得したユーザー一覧です。</p>
          <ul>
            {userList &&
              userList.slice(0, inputLimit).map((user) => (
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
