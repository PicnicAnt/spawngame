import { Gameboard } from './gameboard';

const IMAGE_SIZE = 32;

export abstract class Drawable {
    public image: string;
    public gameboard: Gameboard;
    public color = 0xffffff;
    public radius = 16;

    private _sprite: PIXI.Sprite;
    get sprite(): PIXI.Sprite {
        if (!this._sprite) {
            this._sprite = PIXI.Sprite.fromImage(`assets/images/${this.image}`);
            this._sprite.anchor.set(0.5);
            this._sprite.tint = this.color;
            this._sprite.scale.set((this.radius * 2) / IMAGE_SIZE);
        }
        return this._sprite;
    }

    constructor(gameboard: Gameboard, image: string, color: number) {
        this.gameboard = gameboard;
        this.image = image;
        this.color = color;
    }
}
