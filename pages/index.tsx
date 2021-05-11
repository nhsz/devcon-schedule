import { Button, Center, Divider, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ConferenceDay, Layout } from '../components';
import { filterBy } from '../utils';

const Home = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = selectedDay === 1 ? '2020-04-17' : selectedDay === 2 ? '2020-04-18' : '2020-04-19';

  const fetchAPI = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL ?? '');
    const { next, results } = await res.json();
    let nextResults = [];

    if (next) {
      const nextResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}?offset=25`);
      const { results } = await nextResponse.json();
      nextResults = results;
    }

    const criteria = function (a: any, b: any) {
      return a.slot.start < b.slot.start ? -1 : a.date > b.date ? 1 : 0;
    };

    const finalResults = next ? results.concat(nextResults).sort(criteria) : results.sort(criteria);
    setResults(finalResults);
    setLoading(false);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <Head>
        <title>Devcon Schedule</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Stack direction='row' justifyContent='center' marginTop={6} marginBottom={12}>
          <Heading as='h1' size='2xl'>
            Devcon Schedule
          </Heading>
        </Stack>

        <Layout>
          <Stack mb={2}>
            <Stack direction='row' spacing={4} justifyContent='center' mb={4}>
              <Button onClick={() => setSelectedDay(1)} isActive={selectedDay === 1}>
                Day 1
              </Button>
              <Button onClick={() => setSelectedDay(2)} isActive={selectedDay === 2}>
                Day 2
              </Button>
              <Button onClick={() => setSelectedDay(3)} isActive={selectedDay === 3}>
                Day 3
              </Button>
            </Stack>

            <Stack>
              <Text textAlign='right'>
                {dayjs(
                  selectedDay === 1 ? '2020-04-17' : selectedDay === 2 ? '2020-04-18' : '2020-04-19'
                ).format('MMMM D, YYYY')}
              </Text>
            </Stack>
          </Stack>

          <Divider mb={12} />

          <Stack mb={12}>
            <Stack mb={12}>
              <Stack direction='row' justifyContent='center' marginTop={6} marginBottom={12}>
                <Heading as='h2' size='lg'>
                  Magenta Room
                </Heading>
              </Stack>
              {loading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <ConferenceDay results={filterBy(results, date, 'Magenta Room')} />
              )}
            </Stack>

            <Stack>
              <Divider mb={12} />
            </Stack>

            <Stack>
              <Stack direction='row' justifyContent='center' marginTop={6} marginBottom={12}>
                <Heading as='h2' size='lg'>
                  Khaki Room
                </Heading>
              </Stack>
              {loading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <ConferenceDay results={filterBy(results, date, 'Khaki Room')} />
              )}
            </Stack>
          </Stack>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
