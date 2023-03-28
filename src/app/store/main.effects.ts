import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { MainActionTypes } from './main.actions';

@Injectable()
export class MainEffects {
  getAllCharactersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MainActionTypes.getAllDisneyCharacters),
      mergeMap((payload) =>
        this.mainService
          .getAllDisneyCharacters(
            payload['pageIndex'],
            payload['pageSize'],
            payload['sortField'],
            payload['sortOrder']
          )
          .pipe(
            map((response: any) => {
              return {
                type: MainActionTypes.getAllDisneyCharactersSuccess,
                allCharacters: response.data,
                totalCharacters: response.count * response.totalPages,
              };
            }),
            catchError((err) => {
              console.log(err);
              return of({ type: MainActionTypes.getAllDisneyCharactersFail });
            })
          )
      )
    );
  });

  searchCharactersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MainActionTypes.searchCharacters),
      mergeMap((payload) =>
        this.mainService.searchCharacters(payload['name']).pipe(
          map((response: any) => {
            return {
              type: MainActionTypes.searchCharactersSuccess,
              filteredCharacters: response.data,
            };
          }),
          catchError((err) => {
            console.log(err);
            return of({ type: MainActionTypes.searchCharactersFail });
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private mainService: MainService) {}
}
