import Link from "next/link";
import Image from "next/image";

import CustomLink from "@/components/CustomLink"

interface subNavigationItem {
    name: string;
    href: string;
}

interface navigationItem {
    name: string;
    href: string;
    submenu?: subNavigationItem[];
}

const navigationData: navigationItem[] = [
    { name: "Home", href: "/" },
    {
        name: "Professors",
        href: "/professors",
        submenu: [
            { name: "Mike Young", href: "/mike-young" },
            { name: "Douglas Folsom", href: "/douglas-folsom" },
            { name: "Amy Swearngin", href: "/amy-swearngin" },
            { name: "Mike Young", href: "/mike-young" },
            { name: "Hector Gamero-Jauregui", href: "/hector-gamero-jauregui" },
        ]
    },
    {
        name: "Courses",
        href: "/courses",
        submenu: [
            { name: "PHYS 101", href: "/phys-101" },
            { name: "PHYS 121", href: "/phys-121" },
            { name: "PHYS 123", href: "/phys-123" },
            { name: "ENGR 150", href: "/engr-150" },
        ],
    },
    { name: "Admin", href: "/admin" }
];

// https://picsum.photos/150

const Navbar: React.FC = () => {
    return (
        <div className="flex flex-nowrap items-center grow shrink-0 basis-8/12 px-6 py-3 bg-[#991c2d] text-white ">
            <div className="flex items-center text-nowrap ml-16">
                <Image
                    src={"/tmp.jpg"}
                    alt="Icon"
                    height={150}
                    width={150}
                    className="w-8 h-8 mr-4"
                ></Image>
                <Link href={"#"} className="text-2xl font-bold my-2">
                    SBCC Physics
                </Link>
            </div>
            {/* TODO: Add mobile menu */}
            <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 ml-auto justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                </svg>
            </button>
            <nav className="hidden ml-auto text-xl space-x-4 lg:space-x-6 font-bold md:flex mr-16" aria-label="primary navigaiton">
                {navigationData.map((navItem, index) => (
                    <div key={index} className="flex items-center relative group">
                        <CustomLink
                            className="p-2"
                            href={navItem.href}
                            textColor={"gray-100"}
                            underlineColor={navItem.submenu ? undefined : "gray-100"}
                        >
                            {navItem.name}
                        </CustomLink>
                        {navItem.submenu && (
                            <div aria-label={`container for list of ${navItem.name}`} className="block absolute  top-[100%] z-10 transition-transform origin-top scale-y-0 ease-out group-hover:scale-100">
                                <div className="h-0.5" aria-hidden="true"></div>
                                <ul className="text-left border border-black p-2 left-0 text-black text-sm text-nowrap bg-gray-100" aria-label={`list of ${navItem.name}`}>
                                    {navItem.submenu.map((subNavItem, index) => (
                                        <li
                                            key={index}
                                            className="p-2"
                                        >
                                            {/* TODO: Fix bug - make hover only expand to width of text instead of full length*/}
                                            <CustomLink
                                                href={subNavItem.href}
                                                className="inline-block hover:text-[#991c2d]"
                                                textColor="black"
                                                underlineColor="[#991c2d]"
                                            >
                                                {subNavItem.name}
                                            </CustomLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;