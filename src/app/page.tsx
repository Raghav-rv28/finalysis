import React from 'react';
import { Button,Box, Card, Container, Typography } from '@mui/material';

export default async function Home() {  
  return (
    <main>
      <Container>
        <Box>
          <Card>
            <Typography color="secondary" variant="h2">Hello World</Typography>
          </Card>
        </Box>
        
      </Container>
    </main>
  );
}