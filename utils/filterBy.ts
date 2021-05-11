export const filterBy = (results: any[], date: string, room: string) => {
  return results.filter((res: any) => res.slot.start.includes(date) && res.slot.room.en === room);
};
