"use client";
import { useSearchParams, usePathname, useParams } from "next/navigation";

const GetUrl = () => {
  // URLのパラメーターを取得
  const searchParams = useSearchParams();
  const name = searchParams.get("recipeTitle");
  const foodImageUrl = searchParams.get("foodImageUrl");
  
  console.log(name);

  // URLのパスを取得
  const pathname = usePathname();
  console.log(pathname);

  // 動的ルーティングのパラメータを取得
  const params = useParams();
  console.log(params.categoryId);

  // パラメーターを配列にまとめて返す
  const urlParamsArray = [name, params.categoryId, foodImageUrl];

  return urlParamsArray;
}

export default GetUrl;