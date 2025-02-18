'use client';

import Lottie from 'react-lottie-player';
import loadingAnimation from '@/public/loading.json';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={loadingAnimation} play loop />
    </div>
  );
}
