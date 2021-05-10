import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const Talk = ({ info }: { info: any }) => {
  const router = useRouter();
  const time = new Date(info.slot.start);

  return (
    <Box
      cursor='pointer'
      onClick={() => {
        router.push({ pathname: `/detail/${info.code}` });
      }}
      position='relative'
      mb={1}
    >
      <Stack
        mb={4}
        p={3}
        border='1px'
        borderRadius={6}
        w={{ base: 80, md: '400px', lg: '700px' }}
        _hover={{ bg: '#ebedf0' }}
      >
        <Heading as='h3' size='md'>
          {info.title}
        </Heading>
        <Text fontWeight={500}>
          {info.speakers.length > 1
            ? info.speakers.map((speaker: any, idx: number, arr: any[]) => (
                <span key={speaker.name}>
                  {speaker.name} {idx < arr.length - 1 ? '&' : ''}{' '}
                </span>
              ))
            : info.speakers[0].name}
        </Text>

        <Box position='absolute' bottom={4} right={0} background='black' p={1} w='52px'>
          <Text color='white' textAlign='center'>
            {dayjs(time).format('HH:mm')}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export { Talk };
