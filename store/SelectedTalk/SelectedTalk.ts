import create from 'zustand';

// interface Speaker {
//   name: string;
//   biography: string;
// }

// interface Details {
//   code: string;
//   title: string;
//   speakers: Speaker[];
//   description: string;
// }

type SelectedStore = {
  talks: any[];
  setTalks: (talk: any[]) => void;
  selected: string;
  setSelected: (code: string) => void;
};

const useSelectedStore = create<SelectedStore>(set => ({
  talks: [],
  setTalks: (talks: any[]) => set(state => ({ ...state, talks })),
  selected: '',
  setSelected: (code: string) => set(state => ({ ...state, selected: code }))
}));

export { useSelectedStore };
