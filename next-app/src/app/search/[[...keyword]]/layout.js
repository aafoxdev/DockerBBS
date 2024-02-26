'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import FormSearch from '@/components/FormSearch';

export default function BooksLayout({ children }) {
  const router = useRouter();
  const txtKeyword = useRef(null);
  const handleSearch = () => {
    router.push(`/search/${txtKeyword.current.value}`);
  };

  return (
    <>
    <FormSearch />
    <hr />
    {children}
    </>
  );
}