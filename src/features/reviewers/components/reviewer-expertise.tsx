import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const expertise = [
    "Machine Learning",
    "AI Ethics",
    "Data Science",
    "Algorithmic Bias",
    "Natural Language Processing",
];

const ReviewerExpertise = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    Expertise & Biography
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
                {/* Expertise */}
                <div className="space-y-3">
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">
                        Key Areas of Expertise
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {expertise.map((item) => (
                            <Badge
                                key={item}
                                variant="secondary"
                                className="px-3 py-1 text-xs rounded-md hover:bg-muted/60 transition"
                            >
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Biography */}
                <div className="space-y-3">
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">
                        Biography
                    </p>

                    <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
                        Dr. Evelyn Hayes is an Associate Professor at Stanford
                        University, focusing on the intersection of machine
                        learning and ethical AI development. She received her
                        Ph.D. from MIT and has published extensively on
                        algorithmic fairness and transparency in automated
                        decision-making systems.
                    </p>

                    <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
                        She has served as a lead reviewer for JESAM for over
                        five years, consistently providing rigorous,
                        constructive feedback that elevates the quality of
                        published research.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewerExpertise;
