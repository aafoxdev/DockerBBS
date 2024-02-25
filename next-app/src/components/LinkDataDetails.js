"use client"
import Link from 'next/link';
import DataDetails from './DataDetails';
import { removeData } from '../lib/actions';

export default function LinkedDataDetails({ index, data, showDeleteButton = true }) {
    const handleSubmit = async (event) => {
        event.preventDefault(); // フォーム送信のデフォルト動作を阻止
        await removeData(data); // removeData 関数を非同期で呼び出す
        // 必要であれば、削除後の処理をここに追加（例：ページのリダイレクトなど）
    };

    return (
        <>
            <Link href={`/edit/${data.id}`}>
                <div className="hover:bg-green-100">
                    <DataDetails index={index} data={data} />
                </div>
            </Link>
            {showDeleteButton && (
              <form onSubmit={handleSubmit}>
                  <button type="submit"
                          className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500">
                      削除
                  </button>
              </form>
            )}
        </>
    );
}
