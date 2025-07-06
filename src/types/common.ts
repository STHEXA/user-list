import { Dispatch, SetStateAction } from "react";

//useStateのsetの型
export type setter<T> = Dispatch<SetStateAction<T>>;

//postAPI叩く関数の型
export type asyncAwaitFunc<T, K> = (id: T) => Promise<K>;
