import {loadData} from '../loadData';
import {useCallback, useEffect, useState} from 'react';
import {Config} from '../types';

export const useConfig = () => {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    loadData().then(setConfig);
  }, []);

  // console.log('config', config);

  const setItemValue = useCallback(
    (propName: string, index: number, value: number) =>
      setConfig((config) => {
        if (!config) return;
        return {
          ...config,
          items: config.items.map((row, i) =>
            i === index ? {...row, [propName]: value} : row,
          ),
        };
      }),
    [],
  );

  return {config, setItemValue};
};
