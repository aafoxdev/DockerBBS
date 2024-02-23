// app/page.js
import { getAllDatas } from '@/lib/getter';
import FormEdit from '@/components/FormEdit';
import LinkDataDetails from '@/components/LinkDataDetails';

export const dynamic = 'force-dynamic';
export default async function Home() {
  // users が undefined または空の配列の場合、メッセージを表示
  const datas = await getAllDatas();

  return (
    <>
      {datas.map((b, i) => (
        <LinkDataDetails data={b} index={i + 1} key={b.id} />
      )
      )
      }
      <FormEdit />
    </>
  );
}
