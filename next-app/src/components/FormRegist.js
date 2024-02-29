'use client';

import { useTransition } from 'react';
import { addData, removeData } from '@/lib/actions';


export default function FormEdit({ src: { name, categoryid, cookdate, foodmemo, afterlog, foodImageUrl } }) {
  const [isPending, startTransition] = useTransition();

    return (
    <form action={addData}>
    <input type="hidden" name="name" defaultValue={name} />
    <input type="hidden" name="categoryid" defaultValue={categoryid} />
    <input type="hidden" name="foodImageUrl" defaultValue={foodImageUrl} />
    <div className="mb-3">
      <label className="font-bold" htmlFor="cookdate">閲覧日：</label>
      <input type="date" id="cookdate" name="cookdate"
        className="block bg-gray-100 border-2 border-gray-600 rounded forcus:bg-white focus:outline-none focus:border-red-500"
        defaultValue={cookdate}/>
    </div>
    <div className="mb-3">
      <label className="font-bold" htmlFor="foodmemo">メモ：</label>
      <textarea id="foodmemo" name="foodmemo" rows="3"
        className="block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-red-500"
        defaultValue={foodmemo}></textarea>
    </div>
    <div className="mb-3">
      <label className="font-bold" htmlFor="afterlog">感想：</label>
      <textarea id="afterlog" name="afterlog" rows="3"
        className="block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-red-500"
        defaultValue={afterlog}></textarea>
    </div>
    <button type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500">
        登録</button>
    <button type="submit"
      className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500"
      formAction={removeData}>
      削除</button>
    {/* <button type="button"
      className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500"
      onClick={() => {
        startTransition(() => removeReview(id));
      }}>
      削除</button> */}
    </form>
);
}