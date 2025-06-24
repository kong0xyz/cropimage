import { ShieldCheck } from "lucide-react";
import { Badge } from "./ui/badge";

export default function AppModeBadge({ mode = "page" }: Readonly<{ mode?: "page" | "base" | "saas" }>) {

    return (
        <Badge variant="outline">
            <ShieldCheck className="w-4 h-4" />
            {mode}
        </Badge>
    )
}