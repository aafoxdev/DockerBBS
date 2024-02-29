import { useMemo } from 'react';
import { GetSelectMenulistByKeyword, getDatasByTitle } from '@/lib/getter';
import FormRegist from "@/components/FormRegist"

export default async function Page({ params }) {
  // params.slugsを元に、categoryId, recipeTitle, foodImageUrlを含む配列を作成
  const details = useMemo(() => {
    // params.slugsが未定義の場合は空の配列を返す
    if (!params.slugs) return [];

    // params.slugsの各要素を取得
    // categoryIdとrecipeTitleはそのまま使用、foodImageUrlは全ての残りの部分を結合して1つの要素とする
    const [categoryId, recipeTitle, ...imagePathParts] = params.slugs;
    const foodImageUrl = imagePathParts.join('/'); // スラッシュで結合してURLを再構築

    return [categoryId, decodeURIComponent(recipeTitle), foodImageUrl];
  }, [params.slugs]);

  // categoryIdにアクセス
  const categoryId = details[0];

  // recipeTitleにアクセス
  const name = details[1];

  // foodImageUrlにアクセス
  const foodImageUrl = details[2];

  const cookdate = (new Date()).toLocaleDateString('sv-SE');
  const getdata = await getDatasByTitle(name);
  console.log("testttttt")
  //console.log(getdata[0].foodmemo)

  return (
    <div>
      <GetSelectMenulistByKeyword name={name} categoryid={categoryId} />
      <hr />
      <FormRegist src={{ name: name, categoryid: categoryId, cookdate: cookdate, foodImageUrl: foodImageUrl, foodmemo: getdata[0]?.foodmemo, afterlog: getdata[0]?.afterlog }} />
    </div>
  );
}
