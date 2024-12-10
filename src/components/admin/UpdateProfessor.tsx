"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import TextInput from "@/components/TextInput";
import TextAreaInput from "@/components/TextAreaInput";
import { Professor } from "@/utils/types";

interface UpdateProfessorProps {
    professorId: string
}

const UpdateProfessor: React.FC<UpdateProfessorProps> = ({ professorId }) => {
    const [professor, setProfessor] = useState<Professor | null>(null);
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        const fetchProfessor = async () => {
            const docReference = doc(db, "professors", professorId);
            const docSnapshot = await getDoc(docReference);
            if (docSnapshot.exists()) {
                const professorData = docSnapshot.data();
                setProfessor({
                    id: professorId,
                    name: professorData.name || "Unknown",
                    shortDescription: professorData.shortDescription || "",
                    href: professorData.href || "#",
                    photoURL: professorData.photoURL || "",
                    photoAlt: professorData.photoAlt || "",
                    lastUpdated: professorData.lastUpdated?.toDate?.() || new Date(),
                });
            } else {
                setMessage("Invalid Professor ID")
            }
        };
        fetchProfessor();
    }, [professorId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const docRef = doc(db, "professors", professorId);

        await updateDoc(docRef, { ...professor, lastUpdated: Timestamp.now() });
        setMessage("Professor updated successfully!");
    };

    if (!professor) {
        return <p>Loading professor...</p>;
    }

    return (
        <form onSubmit={handleUpdate}>
            <TextInput
                id="name"
                name="name"
                value={professor.name}
                label="Name"
                placeholder="Enter new Name"
                onChange={(e) => setProfessor({ ...professor, name: e.target.value })}
                type="text"
            />
            <TextAreaInput
                id="shortDescription"
                name="shortDescription"
                value={professor.shortDescription}
                label="Short Description"
                placeholder="Enter new short description"
                onChange={(e) => setProfessor({ ...professor, shortDescription: e.target.value })}
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Update</button>
        </form>
    );
}

export default UpdateProfessor