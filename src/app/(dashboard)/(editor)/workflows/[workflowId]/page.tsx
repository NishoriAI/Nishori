import { requireAuth } from "@/lib/auth-utils"


interface WorkflowProps {
  params: Promise<{
    workflowId: string
  }>
}

const Page = async ({ params }: WorkflowProps) => {
  await requireAuth()

  const { workflowId } = await params
  return (
    <div>
      WorkFlow Id: {workflowId}
    </div>
  )
}


export default Page