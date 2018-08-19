import { Spawner } from "./spawner";
import { Unit } from "./unit";
import { Projectile } from "./projectile";
import { Team } from "./team";

export class Gameboard {
  public spawners: Spawner[] = [];
  public units: Unit[] = [];
  public projectiles: Projectile[] = [];
  public teams: { [id: number]: Team } = [];
  public app: PIXI.Application;
  public ticks: number = 0;

  constructor() {
    this.app = new PIXI.Application(800, 600);
  }

  public addSpawner(spawner: Spawner) {
    this.spawners.push(spawner);
    this.app.stage.addChild(spawner.sprite);
  }

  public addUnit(unit: Unit) {
    this.units.push(unit);
    this.app.stage.addChild(unit.sprite);
  }
  
  public removeUnit(unit: Unit) {
    this.app.stage.removeChild(unit.sprite);
    this.units = this.units.filter(u => u.id !== unit.id);
  }

  public addProjective(projectile: Projectile) {
    this.projectiles.push(projectile);
    this.app.stage.addChild(projectile.sprite);
  }

  public removeProjectile(projectile: Projectile) {
    this.app.stage.removeChild(projectile.sprite);
    this.projectiles = this.projectiles.filter(p => p.id !== projectile.id);
  }
  
  public onGameTick(delta: number) {
    this.ticks += 1;
    this.spawners.forEach(s => s.spawn());
    this.units.forEach(u => {
      u.findTarget(this.units);
      u.move();
      u.dodge(this.projectiles);
      u.shoot(u.target);
    });
    this.projectiles.forEach(p => {
      p.move();
      p.hit(this.units);
      if (p.sprite.x < 0 ||
        p.sprite.y < 0 ||
        p.sprite.x > this.app.renderer.width ||
        p.sprite.y > this.app.renderer.height) {
          this.removeProjectile(p);
        }
    });
  }
}