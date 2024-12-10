import Image from "next/image"
import { Professor } from "@/utils/types"
import Link from "next/link"

const ProfessorCard: React.FC<Professor> = (professor: Professor) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
                <div className="block overflow-hidden rounded-full h-36 w-36">
                    <Image className="" src={professor.photoURL} alt={professor.photoAlt} width={150} height={150} />
                </div>
            </div>
            <a href={professor.href}>
                <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {professor.name}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                {professor.shortDescription}
            </p>
            <Link href={professor.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    )
}

export default ProfessorCard