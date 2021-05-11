import { Box, Container, Heading, Image, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <Stack
        direction='row'
        position='fixed'
        top={0}
        left={1}
        paddingY={4}
        backgroundColor='white'
        w='100%'
        h={12}
        zIndex={9999}
        borderBottom='whitesmoke'
        borderBottomStyle='solid'
      >
        <Link href='/'>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' cursor='pointer'>
            <Box>
              <Image
                boxSize='24px'
                objectFit='cover'
                src='/ethereum-logo.svg'
                alt='Ethereum logo'
              />
            </Box>

            <Heading as='h2' size='md'>
              Devcon 2020
            </Heading>
          </Stack>
        </Link>
      </Stack>

      <Container maxW='container.lg' w={{ base: 96, md: '555px', lg: '777px' }}>
        {children}
      </Container>
    </Box>
  );
};

export { Layout };
