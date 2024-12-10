"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { primaryColor, Professor } from "@/utils/types";
import Link from "next/link";
import CustomLink from "../CustomLink";

export default function ProfessorList() {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const professorsCollection = collection(db, "professors");
        const professorQuery = query(professorsCollection, orderBy("name", "desc"));

        const unsubscribe = onSnapshot(
            professorQuery,
            (snapshot) => {
                try {
                    const fetchedProfessors: Professor[] = snapshot.docs.map((doc) => {
                        const professorData = doc.data();
                        return {
                            id: doc.id,
                            name: professorData.name || "Unknown",
                            shortDescription: professorData.shortDescription || "",
                            href: professorData.href || "#",
                            photoURL: professorData.photoURL || "",
                            photoAlt: professorData.photoAlt || "",
                            lastUpdated: professorData.lastUpdated?.toDate?.() || new Date(),
                        };
                    });
                    setProfessors(fetchedProfessors);
                    setLoading(false);
                } catch (error) {
                    console.error("Error processing snapshot:", error);
                    setLoading(false);
                    setError("Error processing snapshot. Please try again.");
                }
            });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading professors...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl mb-4">Professor List</h1>
            <ul className="space-y-4">
                {professors.map((professor) => (
                    <li key={professor.id} className="font-bold">
                        <CustomLink href={`/admin/${professor.id}`} className="text-2xl" textColor={"black"} underlineColor={primaryColor}>
                            {professor.id}
                        </CustomLink>
                        <p><span className="font-normal">name: </span>{professor.name}</p>
                        <p><span className="font-normal">shortDescription: </span>{professor.shortDescription}</p>
                        <p><span className="font-normal">href: </span>{professor.href}</p>
                        <p><span className="font-normal">photoURL: </span>{professor.photoURL}</p>
                        <p><span className="font-normal">photoAlt: </span>{professor.photoAlt}</p>
                        <p><span className="font-normal">lastUpdated: </span>{professor.lastUpdated.toDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
