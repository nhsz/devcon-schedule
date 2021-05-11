import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Speaker } from '../../types';

interface Props {
  info: {
    time: string;
    code: string;
    title: string;
    speakers: Speaker[];
  };
}

const Talk: FC<Props> = ({ info }) => {
  const router = useRouter();
  const { time, code, title, speakers } = info;
  const talkTime = new Date(time);

  return (
    <Box position='relative' mb={1}>
      <Stack
        onClick={() => {
          router.push({ pathname: `/detail/${code}` });
        }}
        cursor='pointer'
        mb={4}
        p={3}
        border='1px'
        borderRadius={6}
        w={{ base: 80, md: '555px', lg: '777px' }}
        _hover={{ bg: '#ebedf0' }}
      >
        <Heading as='h3' size='md'>
          {title}
        </Heading>
        <Text fontWeight={500}>
          {speakers.length > 1
            ? speakers.map((speaker: Speaker, idx: number, arr: Speaker[]) => (
                <span key={speaker.name}>
                  {speaker.name} {idx < arr.length - 1 ? '&' : ''}{' '}
                </span>
              ))
            : speakers[0].name}
        </Text>

        <Box position='absolute' bottom={4} right={0} background='black' p={1} w='52px'>
          <Text color='white' textAlign='center'>
            {dayjs(talkTime).format('HH:mm')}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export { Talk };
