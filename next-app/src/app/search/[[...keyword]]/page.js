import LinkedDataDetails from '@/components/LinkDataDetails';
import { getDataByKeyword, getMenuDataByKeyword, getMenulistByKeyword } from '@/lib/getter';
import FormSearch from '@/components/FormSearch';
import Container from '@/components/Container';

export default async function SearchResult({ params: { keyword = 'React' } }) {
  const decodedKeyword = decodeURIComponent(keyword);
  const datas = await getDataByKeyword(keyword);
  const menucategorys = await getMenuDataByKeyword(decodedKeyword);
  const menudatas = await getMenulistByKeyword(menucategorys);
  console.log("動作確認")
  console.log(menudatas)
  return (
    <>
    <Container>
      {menudatas.map((b, i) => (
        <LinkedDataDetails data={b} index={i + 1} key={b.id} showsearchlist={true} />
      ))}
    </Container>
    </>
  );
}