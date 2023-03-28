import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { debounceTime, map, Observable, Subscription } from 'rxjs';
import { listAnimation } from 'src/app/shared/animations';
import { Character } from 'src/app/shared/models/character.model';
import { defaultDialogConfig } from 'src/app/shared/models/default-dialog-config';
import { MainActionTypes } from 'src/app/store/main.actions';
import { selectLoading } from 'src/app/store/main.selector';

import { CharacterModalComponent } from '../character-modal/character-modal.component';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersTableComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  @Input() allCharacters$: Observable<Character[]>;

  @Input() searchTerm = null;

  @Input() searchByNameControl: FormControl;

  @Input() totalAndPageIndex$: Observable<{
    total: number;
  }>;

  displayedColumns = [
    'name',
    'tvShowsLength',
    'videoGamesLength',
    'allies',
    'enemies',
  ];

  tableOptions = {
    pageIndex: 1,
    pageSize: 50,
    sortField: 'name',
    sortOrder: 'desc',
  };

  subscription: Subscription;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCharacters();
    this.searchByCharacterName();
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllCharacters() {
    this.store.dispatch({
      type: MainActionTypes.getAllDisneyCharacters,
      pageIndex: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize,
      sortField: this.tableOptions.sortField,
      sortOrder: this.tableOptions.sortOrder,
    });
  }

  searchByCharacterName() {
    this.subscription = this.searchByNameControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((res) => {
        if (res !== null && res !== '') {
          this.searchTerm = res;
          this.store.dispatch({
            type: MainActionTypes.searchCharacters,
            name: this.searchTerm,
          });
        } else {
          this.getAllCharacters();
        }
      });
  }

  selectCharacter(characterData: Character) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = characterData;
    this.dialog.open(CharacterModalComponent, dialogConfig);
  }

  getNextPage(event: PageEvent) {
    const pageSize = event.pageSize;
    if (pageSize !== this.tableOptions.pageSize) {
      this.tableOptions.pageIndex = 0; //set pageIndex to 0 when change the pageSize
      this.tableOptions.pageSize = event.pageSize;
    } else {
      this.tableOptions.pageIndex = event.pageIndex;
      this.tableOptions.pageSize = pageSize;
    }

    this.getAllCharacters();
  }

  sortData(event) {
    const sortColumn = event.active;
    const sortDirection = event.direction;
    this.store.dispatch({
      type: MainActionTypes.sortCharacters,
      sortField: sortColumn,
      sortDirection: sortDirection,
    });
  }
}
