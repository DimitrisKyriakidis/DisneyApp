import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainState } from './main.state';

export const mainState = createFeatureSelector<MainState>('main');

export const selectLoading = createSelector(
  mainState,
  (state) => state.loading
);

export const selectAllCharacters = createSelector(
  mainState,
  (state) => state.allCharacters
);
export const selectTotalAndPageIndex = createSelector(mainState, (state) => {
  return {
    total: state.totalCharacters,
  };
});
