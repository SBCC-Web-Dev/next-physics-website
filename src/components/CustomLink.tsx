import Link from "next/link"

interface CustomLinkProps {
    href: string
    className: string
    children: string | React.ReactElement
    textColor: string
    underlineColor: string | undefined
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, className, children, textColor, underlineColor }) => {
    return (
        underlineColor ?
            <Link href={href} className={className + ` relative text-${textColor} before:transition-all before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-${underlineColor} hover:before:w-full`}>
                {children}
            </Link>
            :
            <Link href={href} className={className + ` relative text-${textColor}`}>
                {children}
            </Link>
    )
}

export default CustomLink