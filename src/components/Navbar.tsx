import Link from "next/link";
import Image from "next/image";

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
            <nav className="hidden ml-auto text-xl space-x-4 lg:space-x-6 font-bold md:flex mr-16">
                {navigationData.map((navItem, index) => (
                    <div key={index} className="flex items-center relative group">
                        <Link
                            className="flex items-center relative text-gray-100 before:transition-all before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-gray-100 hover:before:w-full"
                            href={navItem.href}
                        >
                            {navItem.name}
                        </Link>
                        {navItem.submenu && (
                            <ul className="block absolute text-left border border-black p-2 left-0 top-[125%] text-black text-sm text-nowrap bg-gray-100 transition-transform origin-top scale-y-0 group-hover:scale-100">
                                {navItem.submenu.map((subNavItem, index) => (
                                    <li
                                        key={index}
                                        className="p-2 relative"
                                    >
                                        <Link
                                            href={subNavItem.href}
                                            className="hover:text-[#991c2d] before:transition-all before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-[#991c2d] hover:before:w-full"
                                        >
                                            {subNavItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;