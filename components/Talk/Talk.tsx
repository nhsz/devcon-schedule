import { Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Speaker } from '../../types';
import { slugify } from '../../utils';

interface Props {
  info: {
    time: string;
    title: string;
    speakers: Speaker[];
    type: string;
  };
}

const Talk: FC<Props> = ({ info }) => {
  const router = useRouter();
  const { time, title, speakers, type } = info;
  const talkTime = new Date(time);

  return (
    <Stack
      onClick={() => {
        router.push({ pathname: `/details/${slugify(title)}` });
      }}
      cursor='pointer'
      mb={4}
      border='1px'
      borderRadius={6}
      w={{ base: '360px', md: '560px', lg: '660px' }}
      _hover={{ bg: '#ebedf0' }}
      position='relative'
    >
      <Stack direction='row'>
        <Stack
          background='black'
          w={{ base: 20, md: 20 }}
          justifyContent='center'
          alignItems='center'
          borderLeftRadius={5}
        >
          <Stack w='66px'>
            <Text color='white' textAlign='center' fontSize={{ base: 'lg', md: 'xl' }}>
              {dayjs(talkTime).format('HH:mm')}
            </Text>
          </Stack>
        </Stack>

        <Stack p={{ base: 2, md: 3 }}>
          <Heading as='h3' size='md'>
            {title}
          </Heading>
          <Stack>
            <Text mb={3}>
              {speakers.length > 1
                ? speakers.map((speaker: Speaker, idx: number, arr: Speaker[]) => (
                    <span key={speaker.name}>
                      {speaker.name} {idx < arr.length - 1 ? '&' : ''}{' '}
                    </span>
                  ))
                : speakers[0].name}
            </Text>
          </Stack>

          <Stack
            w='80px'
            borderRadius={6}
            backgroundColor={type === 'Talk' ? 'aliceblue' : 'antiquewhite'}
            p={1}
          >
            <Text fontSize='sm' textAlign='center'>
              {type}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Talk };
