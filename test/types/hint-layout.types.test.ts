import { atom } from 'jotai';
import { expect, test } from 'vitest';
import { HintContainerSchema, HintSchema, HintSectionSchema } from '../../src/ui/types/hint-layout.types';

test('HintSchema (item-location) passes validation', () => {
  expect(
    HintSchema.safeParse({
      name: 'Test Item-Location Hint',
      item: atom(''),
      location: atom(''),
      checked: atom(false),
    }).success
  ).toBe(true);
});

test('HintSchema (item) passes validation', () => {
  expect(
    HintSchema.safeParse({
      name: 'Test Item Hint',
      item: atom(''),
      location: null,
      checked: atom(false),
    }).success
  ).toBe(true);
});

test('HintSchema (location) passes validation', () => {
  expect(
    HintSchema.safeParse({
      name: 'Test Location Hint',
      item: null,
      location: atom(''),
      checked: atom(false),
    }).success
  ).toBe(true);
});

test('HintContainerSchema with empty array fails validation', () => {
  expect(
    HintContainerSchema.safeParse({
      name: 'Test Container',
      color: 'purple',
      hints: [],
    }).success
  ).toBe(false);
});

test('HintContainerSchema passes validation', () => {
  expect(
    HintContainerSchema.safeParse({
      name: 'Test Container',
      color: 'purple',
      hints: [{ name: 'Test Hint', item: atom(''), location: null, checked: atom(false) }],
    }).success
  ).toBe(true);
});

test('HintSectionSchema with empty content fails validation', () => {
  expect(
    HintSectionSchema.safeParse({
      header: 'Test Section',
      lineColor: 'red',
      content: [],
    }).success
  ).toBe(false);
});

test('HintSectionSchema passes validation', () => {
  expect(
    HintSectionSchema.safeParse({
      header: 'Test Section',
      lineColor: 'red',
      content: [
        {
          name: 'Test Container',
          color: 'purple',
          hints: [{ name: 'Test Hint', item: atom(''), location: null, checked: atom(false) }],
        },
      ],
    }).success
  ).toBe(true);
});
