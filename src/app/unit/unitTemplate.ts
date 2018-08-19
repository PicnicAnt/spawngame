export class UnitTemplate {
  public name = `monster${Math.random().toFixed(4)}`;
  public image = 'monster.png';
  public size = 20;
  public speed = 1;
  public dodgeSpeed = 0.3;
  public turningSpeed = 1;
  public spawnSpeed = 100;
  public range = 200;
  public damage = 10;
  public attackSpeed = 5;
  public maxHp = 100;
  public bloodColor = 0xff0000;
  public projectileSize = 10;
  public projectilePenetrations = 0;
  public projectileSpeed = 10;
  public projectileImage = 'projectile.png';
  public accuracy = 0;
  public lifeLeech = 0;

  constructor() {
  }
}
