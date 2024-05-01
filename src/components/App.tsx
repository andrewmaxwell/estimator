import {Box, CircularProgress, Container} from '@mui/material';
import {LocationAccordion} from './LocationAccordion';
import {useConfig} from '../hooks/useConfig';
import {Totals} from './Totals';

const Estimator = () => {
  const {config, setQuantity} = useConfig();

  if (!config) return <CircularProgress size={72} />;
  return (
    <>
      <LocationAccordion
        location="front"
        config={config}
        setQuantity={setQuantity}
      />

      <LocationAccordion
        location="back"
        config={config}
        setQuantity={setQuantity}
      />

      <Totals config={config} />
    </>
  );
};

export const App = () => (
  <Box sx={{flexGrow: 1, mt: 10, pb: 10}}>
    <Container maxWidth="xl">
      <Estimator />
    </Container>
  </Box>
);
