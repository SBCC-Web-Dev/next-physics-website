import { db } from "@/firebase/firebase";
import { Professor } from "@/utils/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function generateStaticParams() {
    const professorsCollection = collection(db, "professors");
    const snapshot = await getDocs(professorsCollection);

    const paths = snapshot.docs.map((doc) => ({
        slug: doc.id,
    }));

    return paths;
}

export default async function ProfessorPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;
    const professorDoc = doc(db, "professors", slug);
    const professorSnapshot = await getDoc(professorDoc);

    if (!professorSnapshot.exists()) {
        return <div>Professor not found</div>;
    }

    // Get professor data

    const professorData = professorSnapshot.data();
    const professor: Professor = {
        id: slug,
        name: professorData.name || "Unknown",
        shortDescription: professorData.shortDescription || "",
        href: professorData.href || "#",
        photoURL: professorData.photoURL || "",
        photoAlt: professorData.photoAlt || "",
        lastUpdated: professorData.lastUpdated?.toDate?.() || new Date(),
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold">{professorData.name}</h1>
            <p className="text-gray-600 mt-2">{professorData.shortDescription}</p>
            <a
                href={professorData.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline mt-4 inline-block"
            >
                View Profile
            </a>
            <div className="mt-6">
                <img
                    src={professorData.photoURL}
                    alt={professorData.photoAlt}
                    className="rounded shadow-md"
                />
            </div>
            <p className="text-sm text-gray-500 mt-4">
                Last Updated: {professor.lastUpdated.toDateString()}
            </p>
        </div>
    );
}