import { Container } from '@chakra-ui/react';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <Container maxW='container.lg' w={{ base: 80, md: '555px', lg: '777px' }}>
      {children}
    </Container>
  );
};

export { Layout };
