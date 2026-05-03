import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { ShieldAlert, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

// ----------------------
// Schema
// ----------------------
const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    institutionalId: z.string().min(1, "Institutional ID is required"),
    email: z.email("Invalid email"),
    submissionRights: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

// ----------------------
// Component
// ----------------------
const CreateUserForm = () => {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            institutionalId: "",
            email: "",
            submissionRights: false,
        },
        mode: "onChange",
    });

    const onSubmit = async (values: FormValues) => {
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            toast.success("User created successfully!");
            form.reset();
            console.log(values);
        }, 1500);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
            >
                {/* ---------------- Core Identity ---------------- */}
                <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-base font-semibold">
                            Core Identity
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 items-start">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Julian Sterling"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="institutionalId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institutional ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123456"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="j.sterling@university.edu"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* ---------------- Submission Rights ---------------- */}
                <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-base font-semibold">
                            Submission Right
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FormField
                            control={form.control}
                            name="submissionRights"
                            render={({ field }) => (
                                <FormItem className="flex items-start gap-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <div className="space-y-1">
                                        <FormLabel className="text-sm font-medium">
                                            Enable Submission Rights
                                        </FormLabel>

                                        <p className="text-sm text-muted-foreground">
                                            Allow this user to bypass standard
                                            role restrictions.
                                        </p>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* ---------------- Actions ---------------- */}
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={submitting}
                        className="px-4"
                    >
                        Cancel
                    </Button>

                    <LoadingButton
                        type="submit"
                        loading={submitting}
                        className="px-4"
                    >
                        Create
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
};

export default CreateUserForm;
