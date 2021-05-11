import { Result } from '../types';

export const filterBy = (results: Result[], date: string, room: string) => {
  return results.filter(res => res.slot.start.includes(date) && res.slot.room.en === room);
};
