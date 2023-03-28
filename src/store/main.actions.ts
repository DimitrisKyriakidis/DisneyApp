import { createAction, props } from '@ngrx/store';
import { Character } from 'src/shared/models/character.model';

export const enum MainActionTypes {
  getAllDisneyCharacters = '[Main] get all disney characters',
  getAllDisneyCharactersSuccess = '[Main] get all disney characters success',
  getAllDisneyCharactersFail = '[Main] get all disney characters fail',

  searchCharacters = '[Main] search characters',
  searchCharactersSuccess = '[Main] search characters success',
  searchCharactersFail = '[Main] search Characters fail',

  sortCharacters = '[Main] sort characters',
}

export const getAllDisneyCharacters = createAction(
  MainActionTypes.getAllDisneyCharacters,
  props<{
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
  }>()
);

export const getAllDisneyCharactersSuccess = createAction(
  MainActionTypes.getAllDisneyCharactersSuccess,
  props<{
    allCharacters: Character[];
    totalCharacters: number;
  }>()
);

export const getAllDisneyCharactersFail = createAction(
  MainActionTypes.getAllDisneyCharactersFail,
  props<{ error: string }>()
);

export const searchCharacters = createAction(
  MainActionTypes.searchCharacters,
  props<{ name?: string }>()
);

export const searchCharactersSuccess = createAction(
  MainActionTypes.searchCharactersSuccess,
  props<{
    filteredCharacters: Character[];
  }>()
);

export const searchCharactersFail = createAction(
  MainActionTypes.searchCharactersFail,
  props<{ error: string }>()
);

export const sortCharacters = createAction(
  MainActionTypes.sortCharacters,
  props<{ sortField?: string; sortDirection?: string }>()
);
