import { expect, test } from 'vitest';
import prime2Json from '../../src/shared/default-presets/prime2.json';
import { PresetSchema } from '../../src/shared/preset.types';

test('default prime2 preset passes validation', () => {
  expect(PresetSchema.safeParse(prime2Json).success).toBe(true);
});
