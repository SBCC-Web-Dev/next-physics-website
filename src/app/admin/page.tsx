"use client";

import ProfessorList from "@/components/admin/ProfessorList";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [myUser, setMyUser] = useState<User | null>(null);

    useEffect(() => {
        const userAuth = getAuth();
        const authStateChanged = onAuthStateChanged(userAuth, (user) => {
            setIsSignedIn(!!user);
            setMyUser(user || null);
        });

        return () => authStateChanged();
    }, []);
    return (
        <main>
            <ProfessorList />
        </main>
    )
}
