
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";


const Page = async() => {

  await requireAuth()

  const data = await caller.getUsers()
  return (
    <div className="h-screen flex items-center justify-center">
     Protected Server Component
     {JSON.stringify(data)}
    </div>
  )
}

export default Page;