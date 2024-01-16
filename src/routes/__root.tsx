import TopNav from '@/components/test/top-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet, RootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = new RootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TopNav />
            <div className="p-4">
                <Outlet />
            </div>
            <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
    );
}

