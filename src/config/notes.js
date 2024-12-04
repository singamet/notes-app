import { addDoc, collection, updateDoc, deleteDoc, getDocs, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createNewNote = async (user, content, color) => {
    try {
        const notesRef = collection(db, "users", user.uid, "notes");
        const docRef = await addDoc(notesRef, {
            content: content,
            color: color,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        // console.log("Note added successfully", docRef.id);
        return docRef
    } catch (err) {
        console.error("Error creating new note: ", err);
    }
};

export const updateNote = async (user, noteId, content, color) => {
    try {
        const noteRef = doc(db, "users", user.uid, "notes", noteId);
        await updateDoc(noteRef, {
            content: content,
            color: color,
            updatedAt: Timestamp.now()
        });
    } catch (err) {
        console.error("Error updating note: ", err);
    }
};

export const deleteNote = async (user, noteId) => {
    try {
        const noteRef = doc(db, "users", user.uid, "notes", noteId);
        await deleteDoc(noteRef);
    } catch (err) {
        console.error("Error deleting note: ", err);
    }
};

export const fetchNotes = async (user) => {
    try {
        const notesQuery = query(collection(db, "users", user.uid, "notes"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(notesQuery);
        const notesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return notesData;
    } catch (err) {
        console.error("Error fetching notes: ", err);
    }
};
