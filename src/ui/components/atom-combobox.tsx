import { ComboboxOption } from '@/types/combobox.types';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { RefObject, useEffect, useState } from 'react';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from './ui/combobox';

type Props = {
  atom: PrimitiveAtom<string>;
  options: ComboboxOption[];
  placeholder?: string;
  emptyStr?: string;
  anchor?: RefObject<Element | null>;
  side?: ComboboxPrimitive.Positioner.Props['side'];
  sideOffset?: ComboboxPrimitive.Positioner.Props['sideOffset'];
  alignOffset?: ComboboxPrimitive.Positioner.Props['alignOffset'];
};

export function AtomCombobox({
  atom,
  options,
  placeholder,
  emptyStr,
  anchor,
  side,
  sideOffset,
  alignOffset,
}: Props) {
  // !STATE
  const [value, setValue] = useAtom(atom);
  const [inputValue, setInputValue] = useState('');

  // !HOOK
  // On init, validate the existing atom value. If invalid, set it to a blank string.
  useEffect(() => {
    if (value) {
      const allOptions = options
        .map((o) => o.items)
        .reduce((acc, cur) => [...acc, ...cur], [] as string[]);
      if (!allOptions.find((option) => option === value)) {
        setValue('');
      }
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync the value atom with the inputValue state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Combobox
      autoHighlight
      items={options}
      value={value}
      onValueChange={(v) => setValue(v ?? '')}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
    >
      <ComboboxInput
        showTrigger={false}
        placeholder={placeholder}
        // !WHY need a right margin or single-column layouts are going to freak out when the list opens
        className="mr-4 font-semibold"
      />
      <ComboboxContent
        anchor={anchor}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <ComboboxEmpty>
          {emptyStr ? emptyStr : 'No entries found.'}
        </ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxGroup key={option.group} items={option.items}>
              <ComboboxLabel>{option.group}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
