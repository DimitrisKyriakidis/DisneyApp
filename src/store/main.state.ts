import { Character } from 'src/shared/models/character.model';

export interface MainState {
  allCharacters: Character[];
  loading: boolean;
  totalCharacters: number;
}
export const initialMainState: MainState = {
  allCharacters: [],
  loading: false,
  totalCharacters: 0,
};
