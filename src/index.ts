export type AsyncMethod<T, U> = (...args: T[]) => Promise<U>

export class PromiseInterval {
    static sleep(delay: number) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    static async set(method: AsyncMethod<[], void>, interval: number) {
        let sleepInterval = interval;
        while (true) {
            // creates a delay and pause process
            await PromiseInterval.sleep(sleepInterval)

            const start = new Date().getTime()

            try {
                await method();
            } catch {
                break;
            }

            const end = new Date().getTime()

            // Calculate new sleep delay
            if (end - start >= interval) {
                // It should run immediately
                sleepInterval = 1
            } else {
                // It calculates processing time of method call
                // and the takes the processing time out of interval time
                sleepInterval = Math.abs(interval - (end - start))
            }
        }
    }

    // TODO: create another method to run this in a web worker
}