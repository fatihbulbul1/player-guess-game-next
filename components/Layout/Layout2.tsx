import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { AppContext } from "../../utils/AppContext";
interface Props {
  children: React.ReactNode;
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Layout2: NextPage<Props> = ({ children }) => {
  const { loggedUsername, setLoggedUsername } = useContext(AppContext);
  return (
    <>
      <Disclosure as="nav" className="relative bg-gray-900 px-2 sm:px-4 py-2">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/" className="flex items-center">
                      <Image
                        src={Logo}
                        className="h-6 mr-3 sm:h-9 w-full"
                        alt="Flowbite Logo"
                      />
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Player Guess
                      </span>
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 items-center">
                      <Link
                        href="/play"
                        className="font-semibold md:text-lg uppercase block py-2 pl-3 pr-4 hover:text-blue-600 rounded bg-transparent text-blue-700 md:p-0"
                        aria-current="page"
                      >
                        Play
                      </Link>

                      <Link
                        href="/leadboard"
                        className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Leadboard
                      </Link>
                      <Link
                        href="/guide"
                        className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Guide
                      </Link>

                      <Link
                        href="/about"
                        className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        About
                      </Link>
                      {loggedUsername !== "" ? (
                        <div className="user bg-red-700 px-4 rounded-md text-black">
                          <Link
                            className="text-black font-semibold md:text-lg block rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white  md:dark:hover:bg-transparent"
                            href={"#"}
                          >
                            {loggedUsername}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    ></Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Link
                  href="/play"
                  className="font-semibold md:text-lg uppercase block py-2 pl-3 pr-4 text-white bg-blue-900 hover:text-blue-600 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Play
                </Link>
                <Link
                  href="/leadboard"
                  className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Leadboard
                </Link>
                <Link
                  href="/guide"
                  className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Guide
                </Link>
                <Link
                  href="/about"
                  className="font-semibold md:text-lg block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
                {loggedUsername !== "" ? (
                  <Link
                    className="bg-red-700 font-semibold md:text-lg block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:hover:bg-red-800 dark:hover:text-white md:dark:hover:bg-transparent"
                    href={"#"}
                  >
                    {loggedUsername}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="px-4 h-full md:h-[calc(100vh-80px)] bg-gray-500 gap-7 flex flex-col items-center justify-center w-full">
        {children}
      </div>
    </>
  );
};
export default Layout2;
