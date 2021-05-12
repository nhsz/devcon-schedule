import create from 'zustand';
import { Talks } from '../../types';

type TalksStore = {
  talks: Talks;
  setTalks: (talks: Talks) => void;
};

const useTalksStore = create<TalksStore>(set => ({
  talks: [],
  setTalks: talks => set(state => ({ ...state, talks }))
}));

export { useTalksStore };
