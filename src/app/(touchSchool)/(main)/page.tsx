import { Text } from '@/shared/components/common/Text';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-full grow items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Text typography="h1">터치스쿨</Text>
        <Image src="/trees/tree-level-1.png" alt="tree-image" width={300} height={300} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Text typography="h4">친구들과 함께 나무를 키워보세요</Text>
          <Link href="/home">
            <Button>
              <Text typography="p" className="font-bold">
                시작하기
              </Text>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
