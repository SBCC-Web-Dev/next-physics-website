import type { Metadata } from "next";
import LoginContainer from "@/components/admin/LoginContainer";

export const metadata: Metadata = {
    title: "SBCC - Physics - Admin",
    description: "The admin page for all things SBCC Physics",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LoginContainer />
            {children}
        </>
    );
}
