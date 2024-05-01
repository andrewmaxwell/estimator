import {Box, CircularProgress, Container} from '@mui/material';
import {LocationAccordion} from './LocationAccordion';
import {useConfig} from '../hooks/useConfig';
import {Totals} from './Totals';

const sections = [
  {location: 'front', category: 'clean up'},
  {location: 'front', category: 'install'},
  {location: 'back', category: 'clean up'},
  {location: 'back', category: 'install'},
];

const Estimator = () => {
  const {config, setItemValue} = useConfig();

  if (!config) return <CircularProgress size={72} />;
  return (
    <>
      {sections.map(({location, category}) => (
        <LocationAccordion
          key={location + category}
          location={location}
          category={category}
          config={config}
          setItemValue={setItemValue}
        />
      ))}

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
