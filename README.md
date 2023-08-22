# Promise Interval

This project shows how you could stop interval in any JS environment to make sure it's previous task is done
successfully. otherwise it'll stop

## Example

```ts
async function task() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    await response.json()
}


(async () => {
    PromiseInterval.set(task, 5000)
})()
```