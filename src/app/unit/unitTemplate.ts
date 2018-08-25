import { Attack } from './attack';
import { ProjectileTemplate } from './projectileTemplate';

export class UnitTemplate {
  public name = `monster${Math.random().toFixed(4)}`;
  public image = 'monster.png';
  public radius = 16;
  public speed = 1;
  public dodgeSpeed = 0.3;
  public spawnSpeed = 100;
  public minRange = 0;
  public maxRange = 200;
  public maxHp = 100;
  public bloodColor = 0xff0000;
  public reflexes = 1;
  public attacks: ProjectileTemplate[] = [];

  constructor() {
  }
}
