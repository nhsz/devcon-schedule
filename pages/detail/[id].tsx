import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const res = await fetch('https://pretalx.com/api/events/democon/talks/');
  const { next, results } = await res.json();
  let nextResults = [];

  if (next) {
    const nextResponse = await fetch('https://pretalx.com/api/events/democon/talks/?offset=25');
    const { results } = await nextResponse.json();
    nextResults = results;
  }

  const criteria = function (a: any, b: any) {
    return a.slot.start - b.slot.start;
  };

  return {
    props: { talks: next ? results.concat(nextResults).sort(criteria) : results.sort(criteria) }
  };
};

const TalkDetails = ({ router, talks }: { router: any; talks: any }) => {
  const details = talks.filter((talk: any) => talk.code === router.query.id)[0];

  return (
    <Stack p={6}>
      <Stack mb={4} maxW='600px'>
        <Stack mb={8}>
          <Heading as='h2' size='lg' mb={2}>
            {details.title}
          </Heading>
          <Text fontSize='2xl'>
            {details.speakers.length > 1
              ? details.speakers.map((speaker: any, idx: number, arr: any[]) => (
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
                details.speakers.map((speaker: any) => (
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
