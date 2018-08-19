import { Gameboard } from "./gameboard";

declare var PIXI: any;

export abstract class Drawable {
    public image: string;
    public gameboard: Gameboard;
    public color: number = 0xffffff;

    private _sprite: PIXI.Sprite;
    get sprite(): PIXI.Sprite {
        if (!this._sprite) {
            this._sprite = PIXI.Sprite.fromImage(`assets/images/${this.image}`);
            this._sprite.anchor.set(0.5);
            this._sprite.tint = this.color;
        }
        return this._sprite;
    }

    constructor(gameboard: Gameboard, image: string, color: number) {
        this.gameboard = gameboard;
        this.image = image;
        this.color = color;
    }
}