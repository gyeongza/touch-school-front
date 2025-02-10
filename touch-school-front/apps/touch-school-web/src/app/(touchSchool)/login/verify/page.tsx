import CodeInputPage from './_page';

export default function Page({ searchParams }: { searchParams: { phoneNumber?: string } }) {
  return <CodeInputPage searchParams={searchParams} />;
}
