import { PrimitiveAtom, useAtom } from 'jotai';
import { useState } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './ui/combobox';

type Props = {
  atom: PrimitiveAtom<string>;
  items: string[];
  placeholder?: string;
  emptyStr?: string;
};

export function AtomCombobox({ atom, items, placeholder, emptyStr }: Props) {
  // !STATE
  const [value, setValue] = useAtom(atom);
  const [inputValue, setInputValue] = useState('');

  return (
    <Combobox
      autoHighlight
      items={items}
      value={value}
      onValueChange={(v) => setValue(v ?? '')}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyStr ? emptyStr : 'No items found.'}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
