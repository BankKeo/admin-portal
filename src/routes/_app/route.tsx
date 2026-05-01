import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                {/* Sidebar */}
                <AppSidebar />

                {/* Content area */}
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <header className="flex h-14 items-center gap-4 border-b px-4">
                        <SidebarTrigger />
                        <div className="flex-1" />

                        {/* Right side (optional) */}
                        <div className="flex items-center gap-2">
                            {/* Add user menu / theme toggle later */}
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1 p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
