export class Square {
  public readonly id: string;
  public x: number;
  public y: number;
  public score: number;
  public readonly obstacle: boolean;

  public constructor(options: {
    id: string;
    x: number,
    y: number,
    score: number,
    obstacle?: boolean,
  }) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.score = options.score;
    this.obstacle = options.obstacle ?? false;
  }

  public moveTo(x: number, y: number, newScore: number): void {
    this.x = x;
    this.y = y;
    this.score = newScore;
  }
}
