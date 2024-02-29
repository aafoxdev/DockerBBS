import Image from 'next/image';

export default function DataDetails({ index, data, showdetail }) {
  const cookDateString = data.cookdate ? new Date(data.cookdate).toISOString().split('T')[0] : '';
  const recipeMaterialString = data.recipeMaterial.join(', ');
  console.log(data)
  return (
    <>
      <div className="flex w-full mb-4">
        <div className="flex-none" style={{ width: '140px', height: '180px', position: 'relative' }}>
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
        <div className="flex flex-col justify-between ml-4" style={{ width: '60%' }}>
          <h3 className="text-lg font-bold">{data.recipeTitle}</h3>
          <p>{data.recipeIndication}</p>
          <p>{data.recipeCost}</p>
          <p>{data.recipeDescription}</p>
        </div>
      </div>
      {showdetail && (
        <div className="mb-3">
          <h2 className="font-bold" htmlFor="foodmemo">材料：</h2>
          <p>{recipeMaterialString}</p>
          <h2 className="font-bold" htmlFor="foodmemo">レシピ詳細：</h2>
          <p><a href={data.recipeUrl} target="_blank" rel="noopener noreferrer" class="text-blue-500">{data.recipeUrl}</a></p>
        </div>
      )}
    </>
  );
}
