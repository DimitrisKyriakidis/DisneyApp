import { createReducer, on } from '@ngrx/store';
import {
  getAllDisneyCharacters,
  getAllDisneyCharactersSuccess,
  searchCharacters,
  searchCharactersSuccess,
  sortCharacters,
} from './main.actions';
import { initialMainState } from './main.state';

export const _mainReducer = createReducer(
  initialMainState,
  on(getAllDisneyCharacters, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getAllDisneyCharactersSuccess, (state, action) => {
    return {
      ...state,
      allCharacters: action.allCharacters,
      totalCharacters: action.totalCharacters,
      loading: false,
    };
  }),
  on(searchCharacters, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(searchCharactersSuccess, (state, action) => {
    return {
      ...state,
      allCharacters: action.filteredCharacters,
      loading: false,
    };
  }),
  on(sortCharacters, (state, action) => {
    let allCharacters = [...state.allCharacters];

    const sorted = [...allCharacters].sort((a, b) => {
      if (a.name < b.name) {
        return action.sortDirection === 'asc' ? -1 : 1;
      } else if (a.name > b.name) {
        return action.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return {
      ...state,
      allCharacters: sorted,
      loading: false,
    };
  })
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}
