"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import { BookOpen, Landmark, User, X } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "react-toastify";

// ----------------------
// 1. Schema (Zod)
// ----------------------
const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    title: z.string(),
    email: z.email("Invalid email"),
    institution: z.string().min(1, "Institution is required"),
    department: z.string().min(1, "Department is required"),
    orcid: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ----------------------
// Component
// ----------------------
const CreateReviewerForm = () => {
    const [interests, setInterests] = useState<string[]>([
        "Climate Modeling",
        "Renewable Energy",
        "Ecosystem Services",
    ]);
    const [input, setInput] = useState("");
    const [hours, setHours] = useState([5]);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            title: "professor",
            email: "",
            institution: "",
            department: "",
            orcid: "",
        },
    });

    // ----------------------
    // Interests logic
    // ----------------------
    const addInterest = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed || interests.includes(trimmed)) return;
        setInterests([...interests, trimmed]);
        setInput("");
    };

    const removeInterest = (item: string) => {
        setInterests(interests.filter((i) => i !== item));
    };

    // ----------------------
    // Submit
    // ----------------------
    const onSubmit = (values: FormValues) => {
        setSubmitting(true);
        const payload = {
            ...values,
            interests,
            availabilityHours: hours[0],
        };

        setTimeout(() => {
            console.log("Submitted data:", payload);
            setSubmitting(false);
            form.reset();
            setInterests([]);
            setHours([5]);
            toast.success("Created reviewer successfully!");
        }, 2000);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                placeholder="Dr. Julian Sterling"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Academic Title</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select title" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="professor">
                                                    Professor
                                                </SelectItem>
                                                <SelectItem value="associate">
                                                    Associate Professor
                                                </SelectItem>
                                                <SelectItem value="assistant">
                                                    Assistant Professor
                                                </SelectItem>
                                                <SelectItem value="doctor">
                                                    Doctor
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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

                {/* ---------------- Affiliation ---------------- */}
                <Card className="rounded-2xl">
                    <CardHeader className="flex gap-2 items-center pb-2">
                        <Landmark className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-base font-semibold">
                            Academic Affiliation
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 items-start">
                            <FormField
                                control={form.control}
                                name="institution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institution</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Oxford University"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Physics Department"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="orcid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ORCID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0000-0002-1825-0097"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* ---------------- Scholarly Scope ---------------- */}
                <Card className="rounded-2xl">
                    <CardHeader className="flex gap-2 items-center pb-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <CardTitle>Scholarly Scope</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Interests */}
                        <div>
                            <p className="text-xs uppercase text-muted-foreground mb-2">
                                Research Interests
                            </p>

                            <div className="border rounded-lg p-3 flex flex-wrap gap-2 items-center">
                                {interests.map((item) => (
                                    <Badge key={item} variant="secondary">
                                        {item}
                                        <X
                                            className="w-3 h-3 ml-1 cursor-pointer"
                                            onClick={() => removeInterest(item)}
                                        />
                                    </Badge>
                                ))}

                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === ","
                                        ) {
                                            e.preventDefault();
                                            addInterest(input);
                                        }
                                    }}
                                    placeholder="Add interest..."
                                    className="border-none h-7 w-32 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <p className="text-xs uppercase text-muted-foreground mb-2">
                                Availability (hrs/week)
                            </p>

                            <div className="flex items-center gap-4">
                                <Slider
                                    value={hours}
                                    onValueChange={setHours}
                                    max={20}
                                    step={1}
                                />
                                <span className="w-12 text-right text-sm">
                                    {hours[0]} hrs
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" className="px-4">
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

export default CreateReviewerForm;
