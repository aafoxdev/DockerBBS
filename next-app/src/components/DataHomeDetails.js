import Image from 'next/image';

export default function DataHomeDetails({ index, data, showhomeitem = false }) {
    const cookDateString = data.cookdate ? new Date(data.cookdate).toISOString().split('T')[0] : '';
    return (
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
                <p>{cookDateString}</p>
                <h3 className="text-base font-bold">料理の感想</h3>
                <p>{data.foodmemo}</p>
            </div>
        </div>
    );
}
