import { expect, it } from 'vitest';

import runDefinitionExpected from './snapshots/run.json';
import { grabDefinition } from '../src/fetcher';

it(`should fetch run's definition`, async () => {
  const runDefinitionActual = await grabDefinition('run');

  expect(runDefinitionActual).toMatchObject(runDefinitionExpected);
});
