'use client';

import { User } from '@/_apis/user/type';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { TreeInfo } from '../../home/_type';

interface BugKillGameProps {
  user: User;
  userTree: TreeInfo;
}

export default function BugKillGame({ user, userTree }: BugKillGameProps) {
  const router = useRouter();
  const { gameAvailableCount } = user;
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [gameSize, setGameSize] = useState({ width: 448, height: 600 });

  useEffect(() => {
    let game: any;
    let Phaser: any;
    let BugKillScene: any;

    const updateGameSize = () => {
      if (gameContainerRef.current) {
        const containerWidth = Math.min(gameContainerRef.current.clientWidth, 448);
        const containerHeight = Math.min(window.innerHeight - 32, containerWidth * 1.5);
        setGameSize({
          width: containerWidth,
          height: containerHeight,
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
            mode: Phaser.Scale.RESIZE,
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

  return (
    <div ref={gameContainerRef} id="game-container" className="fixed inset-0 -m-4 mx-auto h-full w-full rounded-lg" />
  );
}
