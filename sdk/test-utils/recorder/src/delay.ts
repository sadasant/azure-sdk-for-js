// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { isPlayingBack } from "./utils";
/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to be delayed.
 * @returns {Promise<T>} Resolved promise
 */
export function delay(milliseconds: number): Promise<void> | null {
  return isPlayingBack() ? null : new Promise((resolve) => setTimeout(resolve, milliseconds));
}
