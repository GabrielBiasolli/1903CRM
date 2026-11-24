// Simulates network latency so loading states can be seen and tested
// while the services still read from local mocks.
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
