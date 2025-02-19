'use client';

import { User } from '@/_apis/user/type';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { TreeInfo } from '../../home/_type';
import Alert from '@/_components/common/alert';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GameApi } from '../_api';
import { GameCompleteEvent, GameResultRequest, GameResultResponse } from '../_type';
import { revalidateUser } from '@/_actions/revalidate';

interface BugKillGameProps {
  user: User;
  userTree: TreeInfo;
}

const BugKillGame = ({ user, userTree }: BugKillGameProps): JSX.Element => {
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

  const { mutate: completeGame } = useMutation({
    mutationFn: (data: GameResultRequest) => GameApi.postPlayResult(data),
    onSuccess: (data: GameResultResponse) => {
      console.log(data);
      if (data.result.gameCompleted) {
        toast.success(`게임을 완료하여 물주기 ${data.result.waterCount}회 획득했어요!`);
      } else {
        toast.info(`게임을 클리어하지 못했어요. 다시 도전해주세요!`);
      }
      revalidateUser();
      router.push('/home');
    },
    onError: (error) => {
      console.error('게임 데이터 전송 실패:', error);
      toast.error('게임 데이터 전송에 실패했어요.');
      router.push('/home');
    },
  });

  useEffect(() => {
    let game: Phaser.Game;
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
            gameScene.events.on('gameExit', (data: GameCompleteEvent) => {
              router.push(data.route);
            });

            gameScene.events.on('gameComplete', (data: GameCompleteEvent) => {
              completeGame(data.gameData);
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
  }, [userTree.level, router, completeGame]);

  return <div ref={gameContainerRef} id="game-container" className="fixed inset-0 mx-auto h-full w-full" />;
};

export default BugKillGame;
