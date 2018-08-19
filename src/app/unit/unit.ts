import { Drawable } from "./drawable";
import { Gameboard } from "./gameboard";
import { Projectile } from "./projectile";
import { Team } from "./team";
import { UnitTemplate } from "./unitTemplate";

export class Unit extends Drawable {
  public id: number;
  public direction: number;
  public target: Unit;
  public team: Team;
  public targetDistance: number;
  public currentHp: number;
  public attackCooldown: number = 0;
  public kills: number = 0;
  public readonly template: UnitTemplate;

  constructor(gameboard: Gameboard, team: Team, template: UnitTemplate) {
    super(gameboard, template.image, team.color);
    this.id = Math.random();
    this.template = template;
    this.currentHp = this.template.maxHp;
    this.color = team.color;
    this.team = team;
    this.image = template.image;
  }

  public move() {
    if (!this.target) {
      return;
    }

    if (this.targetDistance <= this.template.range) {
      return;
    }
    let angle = 0.5 - Math.atan2(this.target.sprite.x - this.sprite.x, this.target.sprite.y - this.sprite.y);
    let x = this.sprite.x + Math.cos(angle) * this.template.speed;
    let y = this.sprite.y + Math.sin(angle) * this.template.speed;
    this.setPosition(x, y);
  }

  public setPosition(x: number, y: number) {
    this.sprite.x = x < 0 ? 0 : x > this.gameboard.app.renderer.width ? this.gameboard.app.renderer.width : x;
    this.sprite.y = y < 0 ? 0 : y > this.gameboard.app.renderer.height ? this.gameboard.app.renderer.height : y;
  }

  public dodge(projectiles: Projectile[]) {
    let closest: Projectile;
    let closestDistance: number;
    for (let projectile of projectiles) {
      if (projectile.shooter.id === this.id) {
        continue;
      }
      if (projectile.shooter.team.id === this.team.id) {
        continue;
      }
      let distance = Math.hypot(this.sprite.x - projectile.sprite.x, this.sprite.y - projectile.sprite.y) - projectile.shooter.template.projectileSize;
      if (!closest) {
        closest = projectile;
        closestDistance = distance;
      }
      if (distance < closestDistance) {
        closest = projectile;
        closestDistance = distance;
      }
    }

    if (!!closest && closestDistance < this.template.size * 3) {
      let angle = 1 - Math.atan2(closest.sprite.x - this.sprite.x, closest.sprite.y - this.sprite.y);
      let x = this.sprite.x - Math.cos(angle) * this.template.dodgeSpeed;
      let y = this.sprite.y - Math.sin(angle) * this.template.dodgeSpeed;
      this.setPosition(x, y);
    }
  }

  public findTarget(units: Unit[]) {
    let closest: Unit;
    let closestDistance: number;
    for (let unit of units) {
      if (unit.id === this.id) {
        continue;
      }
      if (unit.team.id === this.team.id) {
        continue;
      }
      let distance = Math.hypot(this.sprite.x - unit.sprite.x, this.sprite.y - unit.sprite.y);
      if (!closest) {
        closest = unit;
        closestDistance = distance;
      }
      if (distance < closestDistance) {
        closest = unit;
        closestDistance = distance;
      }
    }
    this.target = closest;
    this.targetDistance = closestDistance;
  }

  public shoot(target: Unit) {
    if (!target) {
      return;
    }

    if (this.attackCooldown > 0) {
      --this.attackCooldown;
    }
    if (this.attackCooldown <= 0) {
      this.attackCooldown = this.template.attackSpeed;

      if (this.targetDistance <= this.template.range) {
        let angle = 1 - Math.atan2(this.target.sprite.x - this.sprite.x, this.target.sprite.y - this.sprite.y);
        let projectile = new Projectile(this, angle);
        projectile.shooter = this;
        projectile.sprite.x = this.sprite.x;
        projectile.sprite.y = this.sprite.y;
        this.gameboard.addProjective(projectile);
      }
    }
  }

  public die() {
    this.gameboard.removeUnit(this);
  }

  public hit(projectile: Projectile): boolean {
    this.currentHp -= projectile.shooter.template.damage;
    if (this.currentHp <= 0) {
      this.die();
      return true;
    }
    return false;
  }
}