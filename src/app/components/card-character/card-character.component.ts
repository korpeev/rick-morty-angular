import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/characters.interface';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss'],
})
export class CardCharacterComponent implements OnInit {
  @Input() character: Character = {} as Character;
  @Input() hasFavorites: boolean = false;
  @Output() addFavorite: EventEmitter<Character> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
