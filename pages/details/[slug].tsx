import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextRouter, withRouter } from 'next/router';
import { FC } from 'react';
import { Layout } from '../../components';
import { useTalksStore } from '../../store';
import { Speaker } from '../../types';
import { slugify } from '../../utils';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

interface Props {
  router: NextRouter;
}

const TalkDetails: FC<Props> = ({ router }) => {
  const talks = useTalksStore(state => state.talks);

  const details = talks.filter(talk => {
    const slug = slugify(talk.title);
    return slug === router.query.slug;
  })[0];

  return (
    <Layout>
      <Stack pt={{ base: 12, md: 6 }} justifyContent='center' alignItems='center' h='100vh'>
        <Stack mb={4}>
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
              <Heading as='h3' fontSize={{ base: 'lg', md: 'xl' }}>
                Description
              </Heading>
              <Text>{details.description}</Text>
            </Stack>

            <Stack>
              <Heading as='h3' fontSize={{ base: 'lg', md: 'xl' }}>
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
    </Layout>
  );
};

export default withRouter(TalkDetails);
