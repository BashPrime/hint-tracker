import { expect, test } from 'vitest';
import {
  PresetHintContainerSchema,
  PresetHintSchema,
} from '../../src/shared/preset.types';

test('PresetHintSchema passes validation', () => {
  expect(
    PresetHintSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      color: 'red',
    }).success
  ).toBe(true);
});

test('PresetHintSchema with optional color passes validation', () => {
  expect(
    PresetHintSchema.safeParse({
      name: 'Test Group',
      type: 'location',
    }).success
  ).toBe(true);
});

test('PresetHintContainerSchema with string hints array passes validation', () => {
  expect(
    PresetHintContainerSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      hints: ['Item 1', 'Item 2', 'Item 3'],
    }).success
  ).toBe(true);
});

test('PresetHintContainerSchema with object hints array passes validation', () => {
  expect(
    PresetHintContainerSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      hints: [
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

test('PresetHintContainerSchema with mixed type hints array passes validation', () => {
  expect(
    PresetHintContainerSchema.safeParse({
      name: 'Test Group',
      type: 'location',
      hints: [
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
