"use client";

import { useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import TextInput from "@/components/TextInput";
import TextAreaInput from "@/components/TextAreaInput";

const AddProfessor: React.FC = () => {
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [href, setHref] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [photoAlt, setPhotoAlt] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form submission handler
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatusMessage("Submitting professor data...");

        try {
            // Add the professor to Firestore
            await addDoc(collection(db, "professors"), {
                name,
                shortDescription,
                href,
                photoURL,
                photoAlt,
                lastUpdated: Timestamp.now(),
            });
            setStatusMessage("Professor added successfully!");
        } catch (error) {
            console.error(error);
            setStatusMessage("Failed to add professor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col p-6">
            <h1 className="text-4xl p-4">Add a Professor</h1>
            <form className="space-y-4 min-w-64" onSubmit={handleSubmit}>
                <TextInput
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Professor Name"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextAreaInput
                    id={"shortDescription"}
                    name={"shortDescription"}
                    value={shortDescription}
                    placeholder="Write a short description"
                    label={"Short Description"}
                    onChange={(e) => setShortDescription(e.target.value)}
                />
                <TextInput
                    id="href"
                    name="href"
                    type="text"
                    value={href}
                    placeholder="Profile Link"
                    label="Profile Link (href)"
                    onChange={(e) => setHref(e.target.value)}
                />
                <TextInput
                    id="photoURL"
                    name="photoURL"
                    type="text"
                    value={photoURL}
                    placeholder="Photo URL"
                    label="Photo URL"
                    onChange={(e) => setPhotoURL(e.target.value)}
                />
                <TextInput
                    id="photoAlt"
                    name="photoAlt"
                    type="text"
                    value={photoAlt}
                    placeholder="Photo Alt Text"
                    label="Photo Alt Text"
                    onChange={(e) => setPhotoAlt(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            {statusMessage && <p className="mt-4 text-sm text-gray-600">{statusMessage}</p>}
        </div>
    );
}

export default AddProfessor