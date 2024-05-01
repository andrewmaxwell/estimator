import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import {ItemTable} from './ItemTable';
import {Config} from '../types';
import {ExpandMore} from '@mui/icons-material';
import {getItemCounts} from '../utils/getItemCounts';

type LocationAccordionProps = {
  location: string;
  category: string;
  config: Config;
  setItemValue: (prop: string, index: number, quantity: number) => void;
};

export const LocationAccordion = ({
  location,
  category,
  config,
  setItemValue,
}: LocationAccordionProps) => {
  const items = config.items.filter(
    (r) => r.location === location && r.category === category,
  );
  const counts = getItemCounts(items);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{textTransform: 'capitalize'}}
      >
        {`${location} Yard ${category} ${counts ? `(${counts})` : ''}`}
      </AccordionSummary>
      <AccordionDetails>
        <ItemTable items={items} config={config} setItemValue={setItemValue} />
      </AccordionDetails>
    </Accordion>
  );
};
