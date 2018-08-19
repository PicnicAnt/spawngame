export class UnitTemplate {
  public name: string = `monster${Math.random().toFixed(4)}`;
  public image: string = 'monster.png';
  public size: number = 20;
  public speed: number = 1;
  public dodgeSpeed: number = 0.3;
  public turningSpeed: number = 1;
  public spawnSpeed: number = 100;
  public range: number = 200;
  public damage: number = 10;
  public attackSpeed: number = 5;
  public maxHp: number = 100;
  public bloodColor: number = 0xff0000;
  public projectileSize: number = 10;
  public projectilePenetrations: number = 0;
  public projectileSpeed: number = 10;
  public projectileImage: string = 'projectile.png';
  public accuracy: number;

  constructor() {
  }
}