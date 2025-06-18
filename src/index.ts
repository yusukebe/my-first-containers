import { Hono } from 'hono'
import { getContainer } from '@cloudflare/containers'
export { MyContainer } from './my-container'

const app = new Hono<{
  Bindings: CloudflareBindings
}>()

app.get('/', (c) => {
  const name = c.req.query('name') ?? 'No name'
  const container = getContainer(c.env.MY_CONTAINER)
  const request = new Request(c.req.raw, {
    headers: {
      'x-my-name': name
    }
  })
  return container.fetch(request)
})

export default app
