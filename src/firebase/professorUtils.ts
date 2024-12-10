import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Professor } from "@/utils/types";

export async function addProfessor(professor: Professor) {
    try {
        const professorsCollection = collection(db, "professors");
        const docRef = await addDoc(professorsCollection, {
            ...professor,
            timestamp: serverTimestamp(),
        });
        console.log("Professor added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding professor:", error);
        throw new Error("Failed to add professor");
    }
}
