import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {

  return(
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-6xl gap-12 items-center justify-between">
        {/* Login Form on Left */}
        <div className="flex-1 w-full max-w-sm">
          {children}
        </div>
        
        {/* Logo on Right */}
        <Link href={'/'} className="hidden md:flex flex-1 flex-col items-center gap-4 font-medium text-6xl text-muted-foreground">
          <Image src={'/logos/nishori.png'} alt="Nishori" width={250} height={250} />
          Nishori
          <p className=" text-sm">Speech to action SOTA AI Agents, build automations by speaking</p>
        </Link>
      </div>
    </div>
  )
}

export default AuthLayout;