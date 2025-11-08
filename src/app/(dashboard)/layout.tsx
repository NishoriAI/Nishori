import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


type Props = {
  children: React.ReactNode
}

const Layout = ({children} : Props) => {

  return(
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className=" bg-accent/20">
        {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}


export default Layout;