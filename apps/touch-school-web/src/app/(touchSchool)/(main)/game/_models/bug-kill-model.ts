import Phaser from 'phaser';
import { getTreeImageAlias } from '../../home/_utils';

interface Bug {
  sprite: Phaser.GameObjects.Sprite;
  speed: number;
}

interface GameState {
  score: number;
  level: number;
  isGameOver: boolean;
  isGameComplete: boolean;
}

// MainScene.ts
class BugKillScene extends Phaser.Scene {
  private tree!: Phaser.GameObjects.Sprite;
  private bugs: Bug[] = [];
  private levelText!: Phaser.GameObjects.Text;
  private gameState: GameState = {
    score: 0,
    level: 1,
    isGameOver: false,
    isGameComplete: false,
  };
  private userTreeLevel: number;
  constructor({ userTreeLevel }: { userTreeLevel: number }) {
    super({ key: 'BugKillScene' });
    this.userTreeLevel = userTreeLevel;
  }

  preload(): void {
    // 임시 에셋을 위한 도형 생성
    this.load.image('tree', `/trees/${getTreeImageAlias(this.userTreeLevel)}.png`);
    this.load.image('bug', '/game-assets/bug.png');
  }

  create(): void {
    this.initializeGameObjects();
    this.setupEventListeners();

    // 충돌 영역 조정
    this.tree.setScale(0.1);
  }

  private initializeGameObjects(): void {
    // UI 텍스트 초기화
    this.levelText = this.add.text(16, 56, `${this.gameState.level}단계`, {
      fontSize: '24px',
      color: '#fff',
    });

    // 중앙에 사과 배치
    this.tree = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'tree');
  }

  private getLevelConfig(level: number) {
    return {
      bugSpeed: 100 + level * 50,
      spawnDelay: Math.max(1000 - level * 200, 400),
      requiredScore: level * 100,
    };
  }

  private setupEventListeners(): void {
    const config = this.getLevelConfig(this.gameState.level);

    this.time.addEvent({
      delay: config.spawnDelay,
      callback: this.spawnBug,
      callbackScope: this,
      loop: true,
    });
  }

  private spawnBug(): void {
    if (this.gameState.isGameOver || this.gameState.isGameComplete) return;

    const spawnPosition = this.getRandomSpawnPosition();
    const bug = this.add.sprite(spawnPosition.x, spawnPosition.y, 'bug');

    // 벌레의 크기도 조정
    bug.setScale(0.3);

    bug.setInteractive();
    bug.on('pointerdown', () => this.killBug(bug));

    const config = this.getLevelConfig(this.gameState.level);
    this.bugs.push({
      sprite: bug,
      speed: config.bugSpeed,
    });
  }

  private getRandomSpawnPosition(): { x: number; y: number } {
    const side = Phaser.Math.Between(0, 3);
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    switch (side) {
      case 0: // 위
        return {
          x: Phaser.Math.Between(0, gameWidth),
          y: -20,
        };
      case 1: // 오른쪽
        return {
          x: gameWidth + 20,
          y: Phaser.Math.Between(0, gameHeight),
        };
      case 2: // 아래
        return {
          x: Phaser.Math.Between(0, gameWidth),
          y: gameHeight + 20,
        };
      default: // 왼쪽
        return {
          x: -20,
          y: Phaser.Math.Between(0, gameHeight),
        };
    }
  }

  private killBug(bugSprite: Phaser.GameObjects.Sprite): void {
    // 파티클 효과
    const particles = this.add.particles(0, 0, 'bug', {
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    particles.explode(10, bugSprite.x, bugSprite.y);

    // 해충 제거
    this.bugs = this.bugs.filter((bug) => bug.sprite !== bugSprite);
    bugSprite.destroy();

    // 점수 증가 및 레벨 업 체크
    this.updateScore();
  }

  private updateScore(): void {
    this.gameState.score += 10;

    const config = this.getLevelConfig(this.gameState.level);
    if (this.gameState.score >= config.requiredScore) {
      if (this.gameState.level >= 3) {
        this.handleGameComplete();
      } else {
        this.gameState.level++;
        this.levelText.setText(`${this.gameState.level}단계`);

        // 기존 벌레들 제거
        this.bugs.forEach((bug) => bug.sprite.destroy());
        this.bugs = [];

        // 새로운 레벨 설정으로 이벤트 리스너 재설정
        this.time.removeAllEvents();
        this.setupEventListeners();
      }
    }
  }

  private handleGameComplete(): void {
    this.gameState.isGameComplete = true;

    // 모든 벌레 제거
    this.bugs.forEach((bug) => bug.sprite.destroy());
    this.bugs = [];

    const gameCompleteText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, '게임 클리어!', {
        fontSize: '24px',
        color: '#fff',
      })
      .setOrigin(0.5);

    const exitButton = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, '물 10회 받기', {
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#333333',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    exitButton.on('pointerdown', () => {
      this.scene.stop();
      // 게임 종료 후 홈으로 라우팅하는 이벤트 발생
      this.events.emit('gameExit', { route: '/home' });
    });
  }

  private handleGameOver(): void {
    this.gameState.isGameOver = true;

    // 모든 벌레 제거
    this.bugs.forEach((bug) => bug.sprite.destroy());
    this.bugs = [];

    const gameOverText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY - 50, '나무를 지키지 못했어요 😭', {
        fontSize: '24px',
        color: '#fff',
      })
      .setOrigin(0.5);

    // 나가기 버튼 추가
    const exitButton = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, '나가기', {
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#333333',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    exitButton.on('pointerdown', () => {
      this.scene.stop();
      // 게임 종료 후 홈으로 라우팅하는 이벤트 발생
      this.events.emit('gameExit', { route: '/home' });
    });
  }

  update(): void {
    if (this.gameState.isGameOver || this.gameState.isGameComplete) return;

    this.bugs.forEach((bug) => {
      const angle = Phaser.Math.Angle.Between(bug.sprite.x, bug.sprite.y, this.tree.x, this.tree.y);

      const velocity = this.physics.velocityFromRotation(angle, bug.speed);
      bug.sprite.x += velocity.x * 0.016;
      bug.sprite.y += velocity.y * 0.016;

      // 충돌 감지 영역을 더 정확하게 조정
      const distance = Phaser.Math.Distance.Between(bug.sprite.x, bug.sprite.y, this.tree.x, this.tree.y);

      if (distance < 40) {
        this.handleGameOver();
      }
    });
  }
}

export default BugKillScene;
