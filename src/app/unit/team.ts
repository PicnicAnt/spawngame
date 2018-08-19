import { Spawner } from "./spawner";

export class Team {
    public id: number;
    public name: string;
    public color: number;
    public spawners: Spawner[] = [];

    constructor() {
        this.id = Math.random();
    }
}