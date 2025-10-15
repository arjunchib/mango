#!/usr/bin/env bun

import { push } from "./push";

if (Bun.argv[2] === "push") {
  push();
}
