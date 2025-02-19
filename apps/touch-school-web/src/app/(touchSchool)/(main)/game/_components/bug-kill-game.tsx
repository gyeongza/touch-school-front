'use client';

import { User } from '@/_apis/user/type';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { TreeInfo } from '../../home/_type';
import Alert from '@/_components/common/alert';

interface BugKillGameProps {
  user: User;
  userTree: TreeInfo;
}

export default function BugKillGame({ user, userTree }: BugKillGameProps) {
  const router = useRouter();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [gameSize, setGameSize] = useState({ width: 448, height: 832 });

  if (user.gameAvailableCount === 0) {
    return (
      <Alert
        title="게임 횟수 초과"
        description="오늘 가능한 게임 횟수를 모두 소진했어요."
        actionText="홈으로"
        onAction={() => {
          router.push('/home');
        }}
      />
    );
  }

  useEffect(() => {
    let game: any;
    let Phaser: any;
    let BugKillScene: any;

    const updateGameSize = () => {
      if (gameContainerRef.current) {
        setGameSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    const initPhaser = async () => {
      try {
        [Phaser, { default: BugKillScene }] = await Promise.all([
          import('phaser'),
          import('../_models/bug-kill-model'),
        ]);

        window.addEventListener('resize', updateGameSize);
        updateGameSize();

        const scene = new BugKillScene({ userTreeLevel: userTree.level });

        const config = {
          type: Phaser.AUTO,
          width: gameSize.width,
          height: gameSize.height,
          parent: 'game-container',
          backgroundColor: '#928152',
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 0 },
            },
          },
          scene: scene,
          scale: {
            mode: Phaser.Scale.FIT,
            width: '100%',
            height: '100%',
            autoCenter: Phaser.Scale.CENTER_BOTH,
          },
        };

        game = new Phaser.Game(config);

        // 게임이 생성된 후에 이벤트 리스너 추가
        game.events.once('ready', () => {
          const gameScene = game.scene.getScene('BugKillScene');
          if (gameScene) {
            gameScene.events.on('gameExit', ({ route }: { route: string }) => {
              router.push(route);
            });
          }
        });
      } catch (error) {
        console.error('Phaser initialization error:', error);
      }
    };

    if (typeof window !== 'undefined') {
      initPhaser();
    }

    return () => {
      window.removeEventListener('resize', updateGameSize);
      if (game) {
        game.destroy(true);
      }
    };
  }, [userTree.level, router]);

  return <div ref={gameContainerRef} id="game-container" className="fixed inset-0 mx-auto h-full w-full" />;
}
