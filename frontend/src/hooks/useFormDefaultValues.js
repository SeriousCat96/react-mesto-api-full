import React from 'react';

export default function useFormDefaultValues(inputs) {
  const defaults = React.useMemo(
    () => {
      const values = {};
      Object.assign(values, ...inputs
        .filter((input) => input.value)
        .map(
          (input) => {
            return {[input.name] : input.value};
          }));

      return values;
    },
    [inputs]
  );

  return defaults;
}