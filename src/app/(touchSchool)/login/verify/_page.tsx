'use client';

import { useSearchParams } from 'next/navigation';
import CodeInputForm from '../_components/code-input-form';

export default function CodeInputPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phoneNumber') ?? '';

  return <CodeInputForm phoneNumber={phoneNumber} />;
}
