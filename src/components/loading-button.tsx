import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

export function LoadingButton({
    loading,
    children,
    ...props
}: LoadingButtonProps) {
    return (
        <Button disabled={loading || props.disabled} {...props}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : children}
        </Button>
    );
}
