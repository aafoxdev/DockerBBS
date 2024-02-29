"use client"
import Link from 'next/link';
import DataDetails from './DataDetails';
import DataHomeDetails from './DataHomeDetails';
import { removeData } from '../lib/actions';

export default function LinkedDataDetails({ index, data, showhomelist, showsearchlist }) {

    const handleSubmit = async (event) => {
        event.preventDefault(); // フォーム送信のデフォルト動作を阻止
        await removeData(data); // removeData 関数を非同期で呼び出す
        // 必要であれば、削除後の処理をここに追加（例：ページのリダイレクトなど）
    };

    return (
        <><div className="hover:bg-green-100">
            {/*<a
                //href={`/edit/${data.categoryId}?recipeTitle=${encodeURIComponent(data.recipeTitle)}&foodImageUrl=${data.foodImageUrl}`}
                href={`/edit/${data.categoryId}/${encodeURIComponent(data.recipeTitle)}/${data.foodImageUrl}`}
                
                rel="noopener noreferrer"

            >
                <div>
                    {showsearchlist && (
                        <>
                            <DataDetails index={index} data={data} />
                        </>
                    )}
                    {showhomelist && (
                        <>
                            <DataHomeDetails index={index} data={data} />
                        </>
                    )}
                </div>
                    </a>*/}
            <Link
                href={`/edit/${data.categoryId}/${encodeURIComponent(data.recipeTitle)}/${data.foodImageUrl}`}
                passHref
            >
          
                    <div>
                        {showsearchlist && (
                            <>
                                <DataDetails index={index} data={data} />
                            </>
                        )}
                        {showhomelist && (
                            <>
                                <DataHomeDetails index={index} data={data} />
                            </>
                        )}
                    </div>
              
            </Link>
        </div>
            {/*showDeleteButton && (
                <form onSubmit={handleSubmit}>
                    <button type="submit"
                        className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500">
                        削除
                    </button>
                </form>
            )*/}
        </>
    );
}
