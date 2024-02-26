import prisma from './prisma';

export async function getAllDatas() {
  return await prisma.reviews.findMany({
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
    if(counter >= 4) break;
    await delay(1000); // 楽天APIのレート制限に対応するために1秒間待機
    // categoryUrlから親子関係を持ったカテゴリID部分を抽出
    const match = category.categoryUrl.match(/(\d+)-(\d+)-(\d+)/);
    const categoryIdPart = match ? `${match[1]}-${match[2]}-${match[3]}` : '';
    const rankingRes = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${apiKey}&categoryId=${categoryIdPart}`);
    const rankingResult = await rankingRes.json();
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
      nickname: item.nickname
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



