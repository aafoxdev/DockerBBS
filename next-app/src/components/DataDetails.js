import Image from 'next/image';

export default function DataDetails({ index, data }) {
  return (
  <div className="flex w-full mb-4">
    
    <div>
      <ul className="list-none text-black ml-4">
        <li>{index && index + '.'}</li>
        <li>{data.title}（{data.price}円）</li>
        <li>{data.author}</li>
        <li>{data.publisher}刊</li>
        <li>{data.memo}</li>
      </ul>
    </div>
  </div>
  );
}