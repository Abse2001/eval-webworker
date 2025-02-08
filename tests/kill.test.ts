import { test, expect } from "bun:test"
import { createCircuitWebWorker } from "../lib"

test("should immediately terminate the worker", async () => {
  const worker = await createCircuitWebWorker({
    webWorkerUrl: new URL("../dist/webworker/index.js", import.meta.url).href,
  })

  // Ensure worker is running
  await worker.execute(`console.log("Worker running");`)

  // Kill the worker
  await worker.kill()

  // Verify worker is terminated by attempting to execute code
  expect(worker.execute(`console.log("Should not execute");`)).rejects.toThrow() // Worker termination should cause execution to fail
})
