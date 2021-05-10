import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelectedStore } from '../../store';

const Talk = ({ info }: { info: any }) => {
  const setSelected = useSelectedStore(state => state.setSelected);
  const router = useRouter();
  const time = new Date(info.slot.start);

  return (
    <Box
      cursor='pointer'
      onClick={() => {
        setSelected(info.code);
        router.push(`/detail/${info.code}`);
      }}
      position='relative'
    >
      <Stack mb={4} p={3} border='1px' borderRadius={6} w={{ base: 80, md: '400px', lg: '700px' }}>
        <Heading as='h3' size='md'>
          {info.title}
        </Heading>
        <Text fontWeight={500}>
          {info.speakers.length > 1
            ? info.speakers.map((speaker: any) => <span key={speaker.name}>{speaker.name} & </span>)
            : info.speakers[0].name}
        </Text>

        <Box position='absolute' bottom={4} right={0} background='black' p={1} w='52px'>
          <Text color='white'>
            {time.getHours()}:{time.getMinutes()}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export { Talk };
