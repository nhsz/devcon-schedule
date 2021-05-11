import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextRouter, withRouter } from 'next/router';
import { FC } from 'react';
import { Result, Speaker } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const res = await fetch('https://pretalx.com/api/events/democon/talks/');
  const { next, results } = await res.json();
  let nextResults = [];

  if (next) {
    const nextResponse = await fetch('https://pretalx.com/api/events/democon/talks/?offset=25');
    const { results } = await nextResponse.json();
    nextResults = results;
  }

  const criteria = function (a: Result, b: Result) {
    return a.slot.start < b.slot.start ? -1 : a.slot.start > b.slot.start ? 1 : 0;
  };

  return {
    props: { talks: next ? results.concat(nextResults).sort(criteria) : results.sort(criteria) }
  };
};

interface Props {
  router: NextRouter;
  talks: Result[];
}

const TalkDetails: FC<Props> = ({ router, talks }) => {
  const details = talks.filter((talk: Result) => talk.code === router.query.id)[0];

  return (
    <Stack p={6}>
      <Stack mb={4} maxW='600px'>
        <Stack mb={8}>
          <Heading as='h2' size='lg' mb={2}>
            {details.title}
          </Heading>
          <Text fontSize='2xl'>
            {details.speakers.length > 1
              ? details.speakers.map((speaker: Speaker, idx: number, arr: Speaker[]) => (
                  <span key={speaker.name}>
                    {speaker.name} {idx < arr.length - 1 ? '&' : ''}{' '}
                  </span>
                ))
              : details.speakers[0].name}
          </Text>
        </Stack>
        <Stack>
          <Stack mb={6}>
            <Heading as='h3' size='md'>
              Description
            </Heading>
            <Text>{details.description}</Text>
          </Stack>

          <Stack>
            <Heading as='h3' size='md'>
              {details.speakers.length > 1 ? 'Biographies' : 'Biography'}
            </Heading>
            <Stack>
              {details.speakers.length > 1 ? (
                details.speakers.map((speaker: Speaker) => (
                  <Stack key={speaker.name} mb={4}>
                    <Text fontWeight={500}>{speaker.name}</Text>
                    <Text>{speaker.biography}</Text>
                  </Stack>
                ))
              ) : (
                <Stack key={details.speakers[0].name} mb={4}>
                  <Text>{details.speakers[0].biography}</Text>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack mt={16} w={48}>
        <Button onClick={() => router.push('/')}>Go back</Button>
      </Stack>
    </Stack>
  );
};

export default withRouter(TalkDetails);
