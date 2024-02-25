"use client"
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function FormSearch() {
  const router = useRouter();
  const txtKeyword = useRef(null);
  const handleSearch = () => {
    router.push(`/search/${txtKeyword.current.value}`);
  };

  return (
    <>
    <form className="mt-2 mb-4">
      <input type="text" ref={txtKeyword}
        className="bg-gray-100 text-black border border-gray-600 rounded mr-2 px-2 py-2 forcus:bg-white focus:outline-none focus:border-red-500" />
      <button type="button" onClick={handleSearch}
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500">
        検索</button>
    </form>
    <hr />
    </>
  );
}