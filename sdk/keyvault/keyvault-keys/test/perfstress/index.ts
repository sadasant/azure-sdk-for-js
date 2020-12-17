// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";

// Tests:
import { SignTest } from "./signTest";

console.log("=== Starting a PerfStress test for Key Vault Keys ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    SignTest,
  ])
);

perfStressProgram.run();
