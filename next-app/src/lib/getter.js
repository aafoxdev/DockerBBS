import prisma from './prisma';
import DataDetails from '@/components/DataDetails';

export async function getAllDatas() {
  return await prisma.RegistDatas.findMany({
    orderBy: {
      id: 'desc'
    }
  });
}

export async function getDatasByTitle(name) {
  return await prisma.RegistDatas.findMany({
    where: {
      recipeTitle: name // recipeTitleが引数で受け取ったnameと完全一致するレコードを検索
    },
    orderBy: {
      id: 'desc'
    }
  });
}

export function createData(data) {
  const authors = data.volumeInfo.authors;
  const price = data.saleInfo.listPrice;
  return {
    id: data.id,
    title: data.volumeInfo.title,
    author: authors ? authors.join(',') : '',
    price: price ? price.amount : 0,
    publisher: data.volumeInfo.publisher,
  };
}

export async function getDataByKeyword(keyword) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
  const result = await res.json();
  const datas = [];
  for (const b of result.items) {
    datas.push(createData(b));
  }
  return datas;
}

export async function getMenuDataByKeyword(keyword) {
  return await prisma.recipeCategory.findMany({
    where: {
      categoryName: {
        contains: keyword, // 'contains'には単一の文字列を渡す
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
}


require('dotenv').config(); // この行をファイルの最上部に追加
require('dotenv').config();
export async function getMenulistByKeyword(menucategorys) {
  const apiKey = process.env.API_KEY;
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // API制限対策

  //console.log("動作確認");
  const categoryRankings = [];
  let counter = 0;
  // 各カテゴリIDに対するランキング情報を順次取得
  for (const category of menucategorys) {
    if (counter >= 3) break;
    await delay(700); // 楽天APIのレート制限に対応するために1秒間待機
    // categoryUrlから親子関係を持ったカテゴリID部分を抽出
    const match = category.categoryUrl.match(/(\d+)-(\d+)-(\d+)/);
    const categoryIdPart = match ? `${match[1]}-${match[2]}-${match[3]}` : '';
    const rankingRes = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${apiKey}&categoryId=${categoryIdPart}`);
    const rankingResult = await rankingRes.json();
    // rankingResult に categoryIdPart を追加
    // categoryIdPartがundefinedでないことを確認
    // categoryIdPartがundefinedでないことを確認し、rankingResultにcategoryIdプロパティを追加
    if (categoryIdPart) {
      // 各ランキング結果にcategoryIdを追加
      rankingResult.result.forEach(item => item.categoryId = categoryIdPart);
    }

    //console.log("rankingResult")
    //console.log(rankingResult)
    categoryRankings.push(rankingResult);
    counter++; // カウンターをインクリメント
  }


  const transformedDatas = categoryRankings.flatMap(transformedData =>
    transformedData.result.map(item => ({
      // ここでitemから必要なデータを抽出し、新しい形式のオブジェクトを作成
      // 以下はダミーのデータとしての例です。実際にはAPIの応答から適切なデータを抽出する
      recipeTitle: item.recipeTitle,
      recipeIndication: item.recipeIndication, // 仮のプロパティ
      foodImageUrl: item.foodImageUrl, // 仮のプロパティ
      recipeCost: item.recipeCost, // 仮のプロパティ
      recipeMaterial: item.recipeMaterial,
      recipeUrl: item.recipeUrl,
      recipeDescription: item.recipeDescription,
      nickname: item.nickname,
      categoryId: item.categoryId
    }))
  );

  //console.log(categoryRankings); // 各カテゴリのランキング情報を表示
  // categoryRankings配列の内容をログに出力する
  //for (const ranking of categoryRankings) {
  //  if (ranking.result) {
  //    console.log("ランキング結果:");
  //    for (const item of ranking.result) {
  //      console.log(item); // ここで各オブジェクトの中身を出力
  //    }
  //  } else {
  //    console.log("ランキング情報が見つかりませんでした。");
  //  }
  //}

  return transformedDatas;
}

require('dotenv').config();
export async function GetSelectMenulistByKeyword({ name, categoryid,  }) {
  const apiKey = process.env.API_KEY;

  // API制限対策のための遅延関数
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // カテゴリランキング情報を保持する配列
  const categoryRankings = [];

  try {
    // 楽天APIからカテゴリランキング情報を取得
    const rankingRes = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${apiKey}&categoryId=${categoryid}`);
    const rankingResult = await rankingRes.json();
    
    // API制限対策: 必要に応じて遅延
    await delay(0); // 1000ミリ秒待機

    // 取得したランキング情報をcategoryRankingsに追加
    categoryRankings.push(rankingResult);

    // 取得したランキング情報から条件に一致するレシピを検索
    const transformedData = categoryRankings.flatMap(item => item.result)
      .find(recipe => recipe.recipeTitle === name);

    if (transformedData) {
      // 条件に一致するレシピが見つかった場合、必要な情報を抽出
      const result = {
        foodImageUrl: transformedData.foodImageUrl,
        mediumImageUrl: transformedData.mediumImageUrl,
        nickname: transformedData.nickname,
        pickup: transformedData.pickup,
        rank: transformedData.rank,
        recipeCost: transformedData.recipeCost,
        recipeDescription: transformedData.recipeDescription,
        recipeId: transformedData.recipeId,
        recipeIndication: transformedData.recipeIndication,
        recipeMaterial: transformedData.recipeMaterial,
        recipePublishday: transformedData.recipePublishday,
        recipeTitle: transformedData.recipeTitle,
        recipeUrl: transformedData.recipeUrl,
        shop: transformedData.shop,
        smallImageUrl: transformedData.smallImageUrl,
      };

      // 結果をコンソールに出力（デバッグ用）
      //console.log(result);

      // 関数からの戻り値としてレシピ情報を返す
      return (
        <>
          <DataDetails index={0} data={result} showdetail={true}/>
        </>
      );
    } else {
      // 一致するレシピが見つからない場合の処理
      console.log("指定されたタイトルに一致するレシピが見つかりませんでした。");
      return null;
    }
  } catch (error) {
    // エラーハンドリング
    console.error("データ取得中にエラーが発生しました:", error);
    return null;
  }
}

//データベースに楽天のカテゴリ一覧を記録する用(API制限を少しでも回避するため)
//export async function getAllRakutenData() {
//  const apiKey = process.env.API_KEY;
//  const res = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${apiKey}`);
//  const result = await res.json();
//
//  if (result.error) {
//    throw new Error(result.error_description); // エラーがあれば例外を投げる
//  }
//
//  console.log("カテゴリーの一括取得");
//
//  if (result.result && result.result.small) {
//    for (const obj of result.result.small) {
//      console.log(`カテゴリーをデータベースに保存: ${obj.categoryName}`);
//      
//      // categoryIdがデータベースに存在するか確認
//      const existingCategory = await prisma.recipeCategory.findUnique({
//        where: {
//          categoryId: obj.categoryId.toString(),
//        },
//      });
//
//      // 存在しない場合のみ新しいレコードを作成
//      if (!existingCategory) {
//        await prisma.recipeCategory.create({
//          data: {
//            categoryId: obj.categoryId.toString(),
//            categoryName: obj.categoryName,
//            categoryUrl: obj.categoryUrl,
//          }
//        });
//        console.log(`カテゴリーID ${obj.categoryId} をデータベースに保存しました。`);
//        // API制限を避けるために適度なディレイを設ける
//        await new Promise(resolve => setTimeout(resolve, 2000)); // 2秒待機
//      } else {
//        console.log(`カテゴリーID ${obj.categoryId} は既にデータベースに存在します。`);
//      }
//    }
//  } else {
//    console.log('Expected data not found in the API response');
//  }
//}
//getAllRakutenData();



