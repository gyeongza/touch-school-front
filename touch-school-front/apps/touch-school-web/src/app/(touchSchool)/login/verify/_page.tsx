'use client';

import CodeInputForm from '../_components/code-input-form';
import { Suspense } from 'react';

export default function CodeInputPage({ searchParams }: { searchParams: { phoneNumber?: string } }) {
  return (
    <Suspense>
      <CodeInputForm phoneNumber={searchParams?.phoneNumber ?? ''} />
    </Suspense>
  );
}
