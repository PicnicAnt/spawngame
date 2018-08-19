import { Spawner } from "./spawner";

export class Team {
    public id: number;
    public name: string;
    public color: number;
    public spawners: Spawner[] = [];
    public kills = 0;

    constructor(name: string) {
        this.id = Math.random();
        this.name = name;
    }
}