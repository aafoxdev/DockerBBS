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