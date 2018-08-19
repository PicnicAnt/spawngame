import { UnitTemplate } from "./unitTemplate";

declare var PIXI: any;

export class SpawnerTemplate {
  public image: string = 'spawner.png';
  public spawnableUnit: UnitTemplate;

  constructor(unit: UnitTemplate) {
    this.spawnableUnit = unit;
  }
}