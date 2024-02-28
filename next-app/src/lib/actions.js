'use server';
import { redirect } from 'next/navigation';
import prisma  from './prisma';

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
  const input = {
    recipeTitle: data.get('name'),
    categoryId: data.get('categoryid'),
    cookdate: cookdate,
    foodmemo: data.get('foodmemo'),
    afterlog: data.get('afterlog'),
    foodImageUrl: data.get('foodImageUrl'),
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

export async function removeData(data){
  //console.log(data)
  //console.log('確認しました')
  await prisma.reviews.delete({
    where: {
      id: data.id
    }
  });
  redirect('/');
}