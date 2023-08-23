import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    // console.log(auth?.currentUser?.email)

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button onClick={signInWithGoogle}>Sign In With Google</button>

            <button onClick={logout}>Sign Out</button>
        </>
    );
};
