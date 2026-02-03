import { expect, test } from 'vitest';
import {
  PresetHintCollectionSchema,
  PresetHintPanelSchema,
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
    PresetHintCollectionSchema.safeParse({
      name: 'Test Collection',
      type: 'location',
      hints: ['Item 1', 'Item 2', 'Item 3'],
    }).success
  ).toBe(true);
});

test('PresetHintCollectionSchema with object hints array passes validation', () => {
  expect(
    PresetHintCollectionSchema.safeParse({
      name: 'Test Collection',
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

test('PresetHintCollectionSchema with mixed type hints array passes validation', () => {
  expect(
    PresetHintCollectionSchema.safeParse({
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

test('PresetHintPanelSchema with single grid object passes validation', () => {
  expect(
    PresetHintPanelSchema.safeParse({
      header: 'Test Panel',
      lineColor: '#ff0000',
      content: {
        numColumns: 1,
        columns: [
          {
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
          },
        ],
      },
    }).success
  ).toBe(true);
});

test('PresetHintPanelSchema with single hint passes validation', () => {
  expect(
    PresetHintPanelSchema.safeParse({
      header: 'Test Panel',
      lineColor: '#ff0000',
      content: {
        name: 'Test Hint',
        color: '#ff0000',
        type: 'location',
      },
    }).success
  ).toBe(true);
});

test('PresetHintPanelSchema with single hint collection passes validation', () => {
  expect(
    PresetHintPanelSchema.safeParse({
      header: 'Test Panel',
      lineColor: '#ff0000',
      content: {
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
      },
    }).success
  ).toBe(true);
});

test('PresetHintPanelSchema with content array passes validation', () => {
  expect(
    PresetHintPanelSchema.safeParse({
      header: 'Test Panel',
      lineColor: '#ff0000',
      content: [
        {
          name: 'Test Hint',
          color: '#ff0000',
          type: 'location',
        },
        {
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
        },
        {
          numColumns: 1,
          columns: [
            {
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
            },
          ],
        },
      ],
    }).success
  ).toBe(true);
});
