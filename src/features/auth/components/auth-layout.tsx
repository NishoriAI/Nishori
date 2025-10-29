


import Image from "next/image";
import Link from "next/link";


type Props = {
  children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {

  return(
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={'/'} className=" flex items-center gap-2 self-center font-medium text-3xl text-muted-foreground">
          <Image src={'/logos/nishori.png'} alt="Nishori" width={50} height={50} />
          Nishori
        </Link>
        {children}
      </div>
    </div>
  )
}


export default AuthLayout;