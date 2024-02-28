"use client"
import GetUrl from "@/components/GettUrl";
import {GetSelectMenulistByKeyword, getDatasByTitle} from '@/lib/getter';
import FormRegist from "@/components/FormRegist"



export default async function Test() {
  const urlParamsArray = GetUrl();
  const name = urlParamsArray[0];
  const categoryid = urlParamsArray[1];
  const foodImageUrl = urlParamsArray[2];
  const cookdate = (new Date()).toLocaleDateString('sv-SE');
  const getdata = await getDatasByTitle(name);
  console.log("testttttt")
  console.log(getdata[0].foodmemo)

  
  
  return (
    <div>
      <GetSelectMenulistByKeyword  name={name} categoryid={categoryid} />
      <hr />
      <FormRegist src={{ name: name, categoryid: categoryid, cookdate: cookdate, foodImageUrl: foodImageUrl, foodmemo: getdata[0]?.foodmemo, afterlog: getdata[0]?.afterlog }} />
    </div>
  );
}
