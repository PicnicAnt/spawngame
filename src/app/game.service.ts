import { Injectable } from '@angular/core';
import { Match } from './unit/match';
import { Team } from './unit/team';
import { Spawner } from './unit/spawner';
import { SpawnerTemplate } from './unit/spawnerTemplate';
import { Gameboard } from './unit/gameboard';
import { UnitTemplate } from './unit/unitTemplate';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public currentMatch: Match;

  public loadMatch(id: number) {
    this.currentMatch = new Match();

    const knight = new UnitTemplate();
    knight.attackSpeed = 20;
    knight.damage = 50;
    knight.speed = 1;
    knight.maxHp = 800;
    knight.image = 'monster.png';
    knight.name = 'Badass Knight';
    knight.dodgeSpeed = 0;
    knight.spawnSpeed = 2000;
    knight.lifeLeech = 0.3;

    const mage = new UnitTemplate();
    mage.attackSpeed = 5;
    mage.damage = 10;
    mage.speed = 0.5;
    mage.maxHp = 70;
    mage.range = 400;
    mage.image = 'monster-mage.png';
    mage.name = 'Mage';
    mage.dodgeSpeed = 0.2;
    mage.spawnSpeed = 1500;
    mage.projectileSpeed = 2;
    mage.accuracy = 0.5;

    const spider = new UnitTemplate();
    spider.attackSpeed = 1;
    spider.damage = 20;
    spider.speed = 3;
    spider.range = 10;
    spider.maxHp = 10;
    spider.image = 'monster-spider.png';
    spider.name = 'Spider';
    spider.dodgeSpeed = 0.1;
    spider.spawnSpeed = 20;
    spider.lifeLeech = 0.2;

    const rabbit = new UnitTemplate();
    rabbit.speed = 5;
    rabbit.attackSpeed = 10;
    rabbit.damage = 100;
    rabbit.maxHp = 500;
    rabbit.range = 100;
    rabbit.image = 'monster-rabbit.png';
    rabbit.name = 'Killer Rabbit';
    rabbit.dodgeSpeed = 3;
    rabbit.spawnSpeed = 5000;
    rabbit.lifeLeech = 0.5;

    const beetle = new UnitTemplate();
    beetle.speed = 3;
    beetle.dodgeSpeed = 1.5;
    beetle.damage = 5;
    beetle.attackSpeed = 50;
    beetle.range = 200;
    beetle.spawnSpeed = 10;
    beetle.maxHp = 10;
    beetle.name = 'Beetle';
    beetle.image = 'monster-beetle.png';
    beetle.accuracy = 0.8;
    beetle.projectileSpeed = 10;
    beetle.lifeLeech = 0.1;

    const archer = new UnitTemplate();
    archer.speed = 1;
    archer.dodgeSpeed = 3;
    archer.range = 2000;
    archer.spawnSpeed = 500;
    archer.projectileSpeed = 100;
    archer.damage = 50;
    archer.attackSpeed = 20;
    archer.name = 'Archer';
    archer.image = 'monster-archer.png';
    archer.accuracy = 0.01;
    archer.maxHp = 60;

    const knightSpawner = new SpawnerTemplate(knight);
    const mageSpawner = new SpawnerTemplate(mage);
    const spiderSpawner = new SpawnerTemplate(spider);
    const rabbitSpawner = new SpawnerTemplate(rabbit);
    const beetleSpawner = new SpawnerTemplate(beetle);
    const archerSpawner = new SpawnerTemplate(archer);

    const team1 = new Team();
    team1.color = 0xff0000;
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, beetleSpawner, 20, 20));
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, knightSpawner, 20, 50));
    team1.spawners.push(new Spawner(this.currentMatch.gameboard, team1, rabbitSpawner, 50, 20));

    const team2 = new Team();
    team2.color = 0x00ff00;
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, mageSpawner, 780, 20));
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, spiderSpawner, 750, 20));
    team2.spawners.push(new Spawner(this.currentMatch.gameboard, team2, spiderSpawner, 780, 50));

    const team3 = new Team();
    team3.color = 0x6600ff;
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 780, 580));
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 780, 550));
    team3.spawners.push(new Spawner(this.currentMatch.gameboard, team3, spiderSpawner, 750, 580));

    const team4 = new Team();
    team4.color = 0x0033ff;
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, mageSpawner, 20, 580));
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, spiderSpawner, 20, 550));
    team4.spawners.push(new Spawner(this.currentMatch.gameboard, team4, rabbitSpawner, 50, 580));

    const team5 = new Team();
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
