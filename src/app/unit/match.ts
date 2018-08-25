import { Team } from "./team";
import { Gameboard } from "./gameboard";

export class Match {
    public teams: Team[] = [];
    public gameboard: Gameboard;
    public paused = true;

    constructor() {
        this.gameboard = new Gameboard();
    }

    public start() {
        for (let i in this.teams) {
            let team = this.teams[i];
            this.gameboard.teams[i] = team;

            for (let spawner of team.spawners) {
                this.gameboard.addSpawner(spawner);
            }
        }

        this.gameboard.app.ticker.add((delta: number) => this.gameboard.onGameTick(delta, this.paused));
        this.play();

    }

    public play() {
        this.paused = false;
    }

    public pause() {
        this.paused = true;
    }
}