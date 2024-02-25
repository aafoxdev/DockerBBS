import LinkedDataDetails from '@/components/LinkDataDetails';
import { getDataByKeyword } from '@/lib/getter';
import FormSearch from '@/components/FormSearch';

export default async function SearchResult({ params: { keyword = 'React' } }) {
  const datas = await getDataByKeyword(keyword);
  return (
    <>
      <FormSearch />
      {datas.map((b, i) => (
        <LinkedDataDetails data={b} index={i + 1} key={b.id} showDeleteButton={false} />
      ))}
    </>
  );
}