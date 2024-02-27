'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import FormSearch from '@/components/FormSearch';

export default function BooksLayout({ children }) {

  return (
    <>
    <FormSearch />
    <hr />
    {children}
    </>
  );
}