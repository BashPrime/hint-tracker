import { ComboboxOption } from '@/types/combobox.types';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
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
};

export function AtomCombobox({ atom, options, placeholder, emptyStr }: Props) {
  // !STATE
  const [value, setValue] = useAtom(atom);
  const [inputValue, setInputValue] = useState(value ?? '');

  // !HOOK
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
      <ComboboxContent>
        <ComboboxEmpty>{emptyStr ? emptyStr : 'No items found.'}</ComboboxEmpty>
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
