import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { activePresetState, presetsState } from '@/states/App.states';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

export function PresetSelector() {
  // !STATE
  const presets = useAtomValue(presetsState);
  const setActivePreset = useSetAtom(activePresetState);

  if (!presets) {
    return null;
  }

  return (
    <div>
      <p>Select a Preset:</p>
      <ItemGroup>
        {presets?.map((preset) => (
          <Item
            key={preset.id}
            className="hover:cursor-pointer dark:hover:bg-gray-800 dark:hover:brightness-150"
            variant="outline"
            onClick={() => setActivePreset(preset)}
          >
            <ItemContent>
              <ItemTitle>{preset.name}</ItemTitle>
              <ItemDescription>{preset.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
