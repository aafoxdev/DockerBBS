// app/page.js
import { getAllDatas } from '@/lib/getter';
//import { getAllDatas, getAllRakutenData } from '@/lib/getter';
import FormEdit from '@/components/FormEdit';
import FormSearch from '@/components/FormSearch';
import LinkDataDetails from '@/components/LinkDataDetails';
import Container from '@/components/Container';
export const dynamic = 'force-dynamic';
export default async function Home() {
  // users が undefined または空の配列の場合、メッセージを表示
  const datas = await getAllDatas();

  return (
    <>
    <FormSearch />
    <Container>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">登録済みリスト</h2>
    
      {datas.map((b, i) => (
        <LinkDataDetails data={b} index={i + 1} key={b.id} showhomelist={true}/>
      )
      )
      }
    </Container>  
    </>
    
  );
}
