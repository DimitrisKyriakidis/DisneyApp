import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../shared/models/character.model';
import {
  selectAllCharacters,
  selectTotalAndPageIndex,
} from '../store/main.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  searchByName = new FormControl(null);
  allCharacters$: Observable<Character[]>;

  totalAndPageIndex$: Observable<{
    total: number;
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.allCharacters$ = this.store.select(selectAllCharacters);
    this.totalAndPageIndex$ = this.store.select(selectTotalAndPageIndex);
  }
}
