import { Container } from '@chakra-ui/react';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <Container maxW='container.lg' height='100vh' alignSelf='center'>
      {children}
    </Container>
  );
};

export { Layout };
