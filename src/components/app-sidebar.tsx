import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, FileText, Users, Settings, User } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

const mainItems = [
    { title: "Dashboard", icon: Home, to: "/" },
    { title: "Submissions", icon: FileText, to: "/submissions" },
];

const managementItems = [
    { title: "Reviewers", icon: Users, to: "/reviewers" },
    { title: "Users", icon: User, to: "/users" },
    { title: "Settings", icon: Settings, to: "/settings" },
];

const AppSidebar = () => {
    const { location } = useRouterState();
    const navigate = useNavigate();

    return (
        <Sidebar className="bg-linear-to-b from-gray-100 to-gray-200">
            <SidebarContent>
                {/* Header */}
                <div className="flex items-center gap-3 px-3 py-4">
                    <div className="w-12 h-10 bg-primary text-white flex items-center justify-center rounded-md font-bold">
                        J
                    </div>
                    <div>
                        <p className="font-semibold">JESAM</p>
                        <p className="text-xs text-muted-foreground">
                            Peer Review & Article Approval System
                        </p>
                    </div>
                </div>

                {/* MAIN */}
                <SidebarGroup>
                    <SidebarGroupLabel>MAIN</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainItems.map((item) => {
                            const isActive = location.pathname === item.to;

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        onClick={() =>
                                            navigate({ to: item.to })
                                        }
                                        className="
                                            h-10
                                            data-[active=true]:bg-primary
                                            data-[active=true]:text-primary-foreground
                                            data-[active=true]:font-medium
                                        "
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>

                {/* MANAGEMENT */}
                <SidebarGroup>
                    <SidebarGroupLabel>MANAGEMENT</SidebarGroupLabel>
                    <SidebarMenu>
                        {managementItems.map((item) => {
                            const isActive = location.pathname.startsWith(
                                item.to,
                            );

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        onClick={() =>
                                            navigate({ to: item.to })
                                        }
                                        className="
                                            h-10
                                            data-[active=true]:bg-primary
                                            data-[active=true]:text-primary-foreground
                                            data-[active=true]:font-medium
                                        "
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Dr. Editor Admin</p>
                        <p className="text-xs text-muted-foreground">
                            Editor-in-Chief
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
