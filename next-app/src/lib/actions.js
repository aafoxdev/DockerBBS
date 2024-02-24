'use server';
import { redirect } from 'next/navigation';
import prisma  from './prisma';

export async function addData(data) {
  const input = {
    title: data.get('title'),
    author: data.get('author'),
    price: parseInt(data.get('price'), 10),
    publisher: data.get('publisher'),
    memo: data.get('memo'),
  }
  //console.log('データの取得をしました')
  //console.log(input)

  // 新しいレコードを作成する
  await prisma.reviews.create({
    data: input
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