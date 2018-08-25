import { Injectable } from '@angular/core';
import { Match } from './unit/match';
import { Team } from './unit/team';
import { Spawner } from './unit/spawner';
import { SpawnerTemplate } from './unit/spawnerTemplate';
import { Gameboard } from './unit/gameboard';
import { UnitTemplate } from './unit/unitTemplate';
import { Attack } from './unit/attack';
import { ProjectileTemplate } from './unit/projectileTemplate';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public currentMatch: Match;

  public loadMatch(id: number) {
    this.currentMatch = new Match();

    const defaultAttack = new ProjectileTemplate();

    const heavySlowHit = new ProjectileTemplate();
    heavySlowHit.damage = 50;
    heavySlowHit.attackSpeed = 20;

    const lightFastHit = new ProjectileTemplate();
    lightFastHit.damage = 10;
    lightFastHit.attackSpeed = 5;
    lightFastHit.maxRange = 400;
    lightFastHit.speed = 2;
    lightFastHit.accuracy = 0.5;

    const shortRangeHit = new ProjectileTemplate();
    shortRangeHit.damage = 20;
    shortRangeHit.attackSpeed = 1;
    shortRangeHit.maxRange = 50;

    const killerHit = new ProjectileTemplate();
    killerHit.attackSpeed = 10;
    killerHit.damage = 100;
    killerHit.maxRange = 100;

    const beetleHit = new ProjectileTemplate();
    beetleHit.damage = 1;
    beetleHit.attackSpeed = 50;
    beetleHit.maxRange = 200;
    beetleHit.accuracy = 0.8;
    beetleHit.speed = 10;
    beetleHit.projectileDecayTime = 50;

    const snipeShot = new ProjectileTemplate();
    snipeShot.maxRange = 2000;
    snipeShot.speed = 100;
    snipeShot.damage = 50;
    snipeShot.attackSpeed = 200;

    const knight = new UnitTemplate();
    knight.attacks.push(heavySlowHit);
    knight.speed = 1;
    knight.maxHp = 800;
    knight.image = 'monster.png';
    knight.name = 'Badass Knight';
    knight.dodgeSpeed = 0;
    knight.spawnSpeed = 2000;

    const mage = new UnitTemplate();
    mage.attacks.push(lightFastHit);
    mage.speed = 0.5;
    mage.maxHp = 70;
    mage.image = 'monster-mage.png';
    mage.name = 'Mage';
    mage.dodgeSpeed = 0.2;
    mage.spawnSpeed = 1500;

    const spider = new UnitTemplate();
    spider.attacks.push(shortRangeHit);
    spider.speed = 3;
    spider.maxHp = 10;
    spider.image = 'monster-spider.png';
    spider.name = 'Spider';
    spider.dodgeSpeed = 0.1;
    spider.spawnSpeed = 20;
    spider.maxRange = 50;

    const rabbit = new UnitTemplate();
    rabbit.attacks.push(killerHit);
    rabbit.speed = 5;
    rabbit.maxHp = 500;
    rabbit.image = 'monster-rabbit.png';
    rabbit.name = 'Killer Rabbit';
    rabbit.dodgeSpeed = 3;
    rabbit.spawnSpeed = 5000;

    const beetle = new UnitTemplate();
    beetle.attacks.push(beetleHit);
    beetle.speed = 3;
    beetle.dodgeSpeed = 1.5;
    beetle.spawnSpeed = 10;
    beetle.maxHp = 10;
    beetle.name = 'Beetle';
    beetle.image = 'monster-beetle.png';

    const archer = new UnitTemplate();
    archer.attacks.push(snipeShot);
    archer.speed = 1;
    archer.dodgeSpeed = 3;
    archer.spawnSpeed = 500;
    archer.name = 'Archer';
    archer.image = 'monster-archer.png';
    archer.maxHp = 60;

    const knightSpawner = new SpawnerTemplate(knight);
    const mageSpawner = new SpawnerTemplate(mage);
    const spiderSpawner = new SpawnerTemplate(spider);
    const rabbitSpawner = new SpawnerTemplate(rabbit);
    const beetleSpawner = new SpawnerTemplate(beetle);
    const archerSpawner = new SpawnerTemplate(archer);

    const team1 = new Team('Team win');
    team1.color = 0xff0000;
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, beetleSpawner, 20, 20));
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, knightSpawner, 20, 50));
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, rabbitSpawner, 50, 20));

    const team2 = new Team('Team Tomato');
    team2.color = 0x00ff00;
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, mageSpawner, 780, 20));
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, spiderSpawner, 750, 20));
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, spiderSpawner, 780, 50));

    const team3 = new Team('Team tootoo');
    team3.color = 0x6600ff;
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 780, 580));
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 780, 550));
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 750, 580));

    const team4 = new Team('Team Taco');
    team4.color = 0x0033ff;
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, mageSpawner, 20, 580));
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, spiderSpawner, 20, 550));
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, rabbitSpawner, 50, 580));

    const team5 = new Team('Team tis');
    team5.color = 0xffffff;
    team5.spawners.push(new Spawner(this.currentMatch.gameboard, team5, beetleSpawner, 370, 270));
    team5.spawners.push(new Spawner(this.currentMatch.gameboard, team5, beetleSpawner, 430, 330));
    team5.spawners.push(new Spawner(this.currentMatch.gameboard, team5, archerSpawner, 400, 300));
    team5.spawners.push(new Spawner(this.currentMatch.gameboard, team5, beetleSpawner, 370, 330));
    team5.spawners.push(new Spawner(this.currentMatch.gameboard, team5, beetleSpawner, 430, 270));

    this.currentMatch.teams.push(team1, team2, team3, team4, team5);
  }

  public newMatch() {
    this.loadMatch(Math.random());
  }
}
