'use server';
import { redirect } from 'next/navigation';
import prisma from './prisma';

//export async function addData(data) {
//  const input = {
//    title: data.get('title'),
//    author: data.get('author'),
//    price: parseInt(data.get('price'), 10),
//    publisher: data.get('publisher'),
//    memo: data.get('memo'),
//  }
//  //console.log('データの取得をしました')
//  //console.log(input)
//
//  // 新しいレコードを作成する
//  await prisma.reviews.create({
//    data: input
//  });
// redirect('/');
//}

export async function addData(data) {
  const cookdate = data.get('cookdate') + 'T00:00:00.000Z';
  const encodedUrl = data.get('foodImageUrl');
  // 'https%3A/' を 'https://' に直接置換
  const correctedUrl = encodedUrl.replace('https%3A/', 'https://');

  console.log(correctedUrl); // 置換後のURLが出力される
  const input = {
    recipeTitle: data.get('name'),
    categoryId: data.get('categoryid'),
    cookdate: cookdate,
    foodmemo: data.get('foodmemo'),
    afterlog: data.get('afterlog'),
    foodImageUrl: correctedUrl,
  }
  console.log('データの取得をしました');
  console.log(input);

  // レコードが存在する場合は更新し、存在しない場合は新規作成する
  await prisma.RegistDatas.upsert({
    where: {
      recipeTitle: input.recipeTitle, // 重複チェックの基準
    },
    update: {
      ...input,
      // 更新したいフィールドがあればここに追記する
      // 例: foodmemo: input.foodmemo,
    },
    create: {
      ...input,
    }
  });

  redirect('/');
}

export async function removeData(formData) {
  // FormDataからレシピのタイトルを直接取得
  const recipeTitle = formData.get('name');
  let flag = 0;

  try {
    // レシピのタイトルに一致するレコードが存在するか先に確認
    const existingRecord = await prisma.RegistDatas.findFirst({
      where: {
        recipeTitle: recipeTitle,
      },
    });

    // レコードが存在する場合のみ削除を実行
    if (existingRecord) {
      await prisma.RegistDatas.delete({
        where: {
          recipeTitle: recipeTitle,
        },
      });
      console.log(`Deleted record where recipe title is '${recipeTitle}'`);
      flag = 1;
    } else {
      // レコードが存在しない場合、ここで処理を終了
      console.log(`No record found with recipe title '${recipeTitle}'. No action taken.`);
    }

    // サーバーサイドで実行される場合、リダイレクトはレスポンスを使って行う
    // クライアントサイドのリダイレクトが必要な場合は、適切な方法を選択してください
  } catch (error) {
    console.error("Failed to delete the data:", error);
    // 適切なエラーハンドリングをここで行う
  }
  if (flag==1){
    redirect('/');
  }
}