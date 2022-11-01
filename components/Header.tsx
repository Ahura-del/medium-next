import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import icon from '../public/assets/icon.png';
function Header() {
  return (
    <>
      <Head>
        <title>Medium</title>
      </Head>
      <header className="flex items-center px-5  max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              src={icon}
              alt="logo"
              width={77}
              height={20}
            />
          </Link>
          <div className="hidden md:flex md:gap-4 md:items-center ">
            <h3 className="cursor-pointer" >Our story</h3>
            <h3 className="cursor-pointer" >Write</h3>
            <h3 className="bg-green-600 px-5 py-1 cursor-pointer rounded-full text-white" >Follow</h3>
          </div>
        </div>
        <div className="flex items-center gap-5" >
          <button className="text-green-600 border-none focus:outline-none" >Sign in</button>
          <button className=" border border-green-600 text-green-600 rounded-full py-2 px-5" >Get Started</button>
        </div>
      </header>
    </>
  );
}

export default Header;
