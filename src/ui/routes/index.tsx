import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { presetsState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  // !STATE
  const presets = useAtomValue(presetsState);

  if (!presets) {
    return null;
  }

  return (
    <div>
      <p>Select a Layout:</p>
      <ItemGroup>
        {presets?.map((preset) => (
          <Link to="/layouts/$layoutId" params={{ layoutId: preset.id }}>
            <Item
              key={preset.id}
              className="hover:cursor-pointer dark:hover:bg-gray-800 dark:hover:brightness-150"
              variant="outline"
            >
              <ItemContent>
                <ItemTitle>{preset.name}</ItemTitle>
                <ItemDescription>{preset.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Item>
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}
