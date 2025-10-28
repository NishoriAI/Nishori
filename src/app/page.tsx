import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Page = () => {
  const something = true;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className={cn("text-muted-foreground text-6xl font-bold")}>
        <Button>
          Click
        </Button>
        Hello
      </div>
    </div>
  )
}

export default Page;