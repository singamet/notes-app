import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const signupUser = async (fullname, email, password) => {

    try {
        const docRef = await doc(db, "users", email)
        const snap = getDoc(docRef)
        if ((await snap).exists()) {
            
            console.log("Email already exists!!")
            throw new Error("Email already exists!")
        }
        else {
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCred.user
            user.displayName = fullname 
            await setDoc(doc(db, "users", user.uid), {
                fullname: fullname,
                email: email
            })  
            return user
        }
    }
    catch (err) {
        throw Error(err.message)
    }
    
}

export const loginUser = async (email, password) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        const user = userCred.user
        if (user) {
            const docRef = await doc(db, "users", user.uid)
            const snap = await getDoc(docRef)
            // console.log(snap.exists())
            if (snap.exists()) {
                const userData = await snap.data()
                // console.log(userData)
                await updateProfile(user, {displayName: userData.fullname})
                return {...user, displayName:userData.fullname}
            }
            else {
                throw Error("User Data not found!")
            }
        }
        else {
            throw new Error("Invalid Login Credentials")
        }
    }
    catch (err) {
        throw new Error(err.message)
    }
}

export const googleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        const docRef = await doc(db, "users", user.email)
        const snap = await getDoc(docRef)
        if (!(await snap).exists()) {
            await setDoc(doc(db, "users", user.uid), {
                fullname: user.displayName,
                email: user.email
            })
        }
        return user
    }
    catch (err) {
        throw Error(err.message)
    }
}

export const logoutUser = async () => {
    try {
        return await auth.signOut()
    }
    catch (err) {
        throw Error(err.message)
    }
}