'use client'

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const Page = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.getWorkflows.queryOptions())
  const queryClient = useQueryClient()


  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Job queued")
    }
  }))

  return (
    <div className="h-screen flex flex-col items-center justify-center">
     Protected Server Component
     <div>
     {JSON.stringify(data, null, 2)}
     </div>
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