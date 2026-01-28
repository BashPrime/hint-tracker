import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { activePresetState, defaultPresetsState } from '@/states/App.states';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

export function PresetSelector() {
  // !STATE
  const presets = useAtomValue(defaultPresetsState);
  const setActivePreset = useSetAtom(activePresetState);

  return (
    <div>
      <p>Select a Preset:</p>
      <ItemGroup>
        {presets?.map((preset) => (
          <Item
            className="hover:cursor-pointer hover:brightness-150 hover:bg-gray-800"
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
