"use client"
import GetUrl from "@/components/GettUrl";
import {GetSelectMenulistByKeyword} from '@/lib/getter';



export default  function Test() {
  const urlParamsArray = GetUrl();
  const name = urlParamsArray[0];
  const categoryid = urlParamsArray[1];
  return (
    <div>
      <GetSelectMenulistByKeyword  name={name} categoryid={categoryid} />
    </div>
  );
}
