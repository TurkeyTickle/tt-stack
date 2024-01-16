import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/test').createRoute({
  component: TestRoute,
})

function TestRoute() {
  return (
    <div className="p-2">
      <h3>Welcome test!</h3>
    </div>
  )
}