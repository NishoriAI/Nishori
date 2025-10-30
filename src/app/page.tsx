'use client'

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const Page = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient()


  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success('AI Job queued')
    }
  }))

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Job queued")
    }
  }))

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-4">
     Protected Server Component
     <div className="flex flex-col">
     {JSON.stringify(data, null, 4)}
     </div>
     <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
      Test Gemini
     </Button>
     <Button
     onClick={() => create.mutate()}
     disabled={create.isPending}
     >
      Create
     </Button>
    </div>
  )
}

export default Page;