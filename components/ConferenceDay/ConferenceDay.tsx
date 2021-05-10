import { Stack } from '@chakra-ui/react';
import { Talk } from '../../components';

const ConferenceDay = ({
  results,
  selectedDay,
  room
}: {
  results: any;
  selectedDay: any;
  room: string;
}) => {
  const date = selectedDay === 1 ? '2020-04-17' : selectedDay === 2 ? '2020-04-18' : '2020-04-19';

  return (
    <>
      {results
        .filter((res: any) => res.slot.start.includes(date) && res.slot.room.en === room)
        .map((result: any) => {
          return (
            <Stack key={result.code} alignItems='center'>
              <Talk info={result} />
            </Stack>
          );
        })}
    </>
  );
};

export { ConferenceDay };
