import { Drawable } from './drawable';
import { Unit } from './unit';
import { Gameboard } from './gameboard';
import { Team } from './team';
import { SpawnerTemplate } from './spawnerTemplate';

declare var PIXI: any;

export class Spawner extends Drawable {
  public id: number = Math.random();
  public readonly template: SpawnerTemplate;
  public team: Team;
  public spawnCooldown = 0;

  constructor(gameboard: Gameboard, team: Team, template: SpawnerTemplate, x: number, y: number) {
    super(gameboard, template.image, team.color);
    this.template = template;
    this.team = team;
    this.color = team.color;
    this.image = template.image;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  public spawn() {
    if (this.spawnCooldown > 0) {
      --this.spawnCooldown;
    }
    if (this.spawnCooldown <= 0) {
      this.spawnCooldown = this.template.spawnableUnit.spawnSpeed;
      const unit = new Unit(this.gameboard, this.team, this.template.spawnableUnit);
      unit.sprite.x = this.sprite.x;
      unit.sprite.y = this.sprite.y;
      this.gameboard.addUnit(unit);
    }
  }
}
