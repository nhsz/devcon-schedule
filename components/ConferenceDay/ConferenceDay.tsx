import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Talk } from '../../components';
import { Result } from '../../types';

interface Props {
  results: Result[];
}

const ConferenceDay: FC<Props> = ({ results }) => {
  return (
    <>
      {results.map((result: Result) => {
        const info = {
          time: result.slot.start,
          code: result.code,
          title: result.title,
          speakers: result.speakers
        };

        return (
          <Stack key={result.code} alignItems='center'>
            <Talk info={info} />
          </Stack>
        );
      })}
    </>
  );
};

export { ConferenceDay };
