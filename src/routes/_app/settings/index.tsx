import SettingHeader from "@/features/settings/setting-header";
import SettingForm from "@/features/settings/settings-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="max-w-4xl m-auto space-y-4 sm:space-y-6">
            <SettingHeader />
            <SettingForm />
        </div>
    );
}
