import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  @ViewChild('gameboard') gameboardElement: ElementRef;

  constructor(public gameService: GameService) {
  }

  ngOnInit() {
    this.initializeGameboard();
  }

  initializeGameboard() {
    
    this.gameService.newMatch();
    console.log(this.gameService.currentMatch);
    this.gameboardElement.nativeElement.appendChild(this.gameService.currentMatch.gameboard.app.view);
    this.gameService.currentMatch.start();
  }
}
