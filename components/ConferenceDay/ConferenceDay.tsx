import { Stack } from '@chakra-ui/react';
import { Talk } from '../../components';

const ConferenceDay = ({ results }: { results: any }) => {
  return (
    <>
      {results.map((result: any) => {
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
