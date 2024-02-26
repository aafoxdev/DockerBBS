import Image from 'next/image';

export default function DataDetails({ index, data }) {
  return (
  <div className="flex w-full mb-4">
    <div style={{ width: '140px', height: '180px', overflow: 'hidden', position: 'relative' }}>
  <Image
    src={data.foodImageUrl}
    alt=""
    layout="fill"
    objectFit="cover"
    objectPosition="center"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,ここにブラー画像のbase64エンコードデータを挿入"
  />
</div>
    <div>
      <ul className="list-none text-black ml-4">
      <li>{data.recipeTitle}</li>
        
      </ul>
    </div>
  </div>
  );
}