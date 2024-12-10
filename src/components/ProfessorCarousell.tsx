"use client"

import { useEffect, useState } from "react"
import Container from "./Container"
import { Professor } from "@/utils/types";
import ProfessorCard from "./ProfessorCard"

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";



const ProfessorCarousel: React.FC = () => {
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
                    // console.log(professors)
                    setLoading(false);
                    setError(null);
                } catch (error) {
                    console.error("Error processing snapshot:", error);
                    setLoading(false);
                    setError("Error processing snapshot. Please try again.");
                }
            },
            (firestoreError) => {
                console.error("Error fetching Firestore data:", firestoreError);
                setLoading(false);
                setError("Error fetching data from Firestore.");
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading professors...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <>
            <Container>
                <div className="w-9/12">
                    <h2 className="text-3xl font-semibold text-[#991c2d] bg-white p-4">Meet Our Professors</h2>
                    <div className="flex items-center justify-center">
                        {professors.map((professor) => (
                            <ProfessorCard
                                key={professor.id}
                                id={professor.id}
                                name={professor.name}
                                shortDescription={professor.shortDescription}
                                href={professor.href}
                                photoURL={professor.photoURL}
                                photoAlt={professor.photoAlt}
                                lastUpdated={professor.lastUpdated}

                            />
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProfessorCarousel