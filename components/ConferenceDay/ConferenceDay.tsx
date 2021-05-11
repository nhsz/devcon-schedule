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
      {results.map(result => {
        const info = {
          time: result.slot.start,
          title: result.title,
          speakers: result.speakers,
          type: result.submission_type
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
