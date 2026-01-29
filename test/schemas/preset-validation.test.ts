import { expect, test } from 'vitest';
import { PresetBaseHintSchema, PresetHintSchema } from '../../src/shared/preset.types';

test('PresetBaseHintSchema passes validation', () => {
  expect(
    PresetBaseHintSchema.safeParse({
      name: 'test hint',
      type: 'item-location',
    }).success
  ).toBe(true);
});

test('PresetHintSchema with string group passes validation', () => {
  expect(
    PresetHintSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      group: ['Item 1', 'Item 2'],
    }).success
  ).toBe(true);
});

test('PresetHintSchema with object group passes validation', () => {
  expect(
    PresetHintSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      group: [
        {
          name: 'Item 1',
          type: 'location',
        },
        {
          name: 'Item 2',
          type: 'item-location',
        },
        {
          name: 'Item 3',
          type: 'item',
        },
      ],
    }).success
  ).toBe(true);
});

test('PresetHintSchema with mixed group passes validation', () => {
  expect(
    PresetHintSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      group: [
        'Item 1',
        {
          name: 'Item 2',
          type: 'item-location',
        },
        'Item 3',
        'Item 4',
        {
          name: 'Item 5',
          type: 'item',
        },
      ],
    }).success
  ).toBe(true);
});
