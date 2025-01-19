import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase.init";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  // Function to send user data to the backend

  const storeUserInformation = async (uid, email, displayName, photoURL) => {
    try {
      const response = await axiosPublic.post("/all-users", {
        uid,
        email,
        displayName,
        photoURL,
        Role: "User",
      });

      // Check if the user data was successfully inserted
      if (response.data.insertedId) {
        // Swal.fire({
        //   title: "Success!",
        //   text: "User information has been stored successfully.",
        //   icon: "success",
        //   confirmButtonText: "OK",
        // });
      } else {
        // Display failure message if insertedId is not returned
        // Swal.fire({
        //   title: "Error!",
        //   text: response.data.message || "Failed to store user information.",
        //   icon: "error",
        //   confirmButtonText: "OK",
        // });
      }
    } catch (error) {
      console.error("Error storing user information:", error);
      // Swal.fire({
      //   title: "Error!",
      //   text: "Something went wrong while storing user information.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    }
  };

  const signUpWithEmailPassword = async (name, email, password, photo) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      setUser({
        ...user,
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmailPassword = async (email, password) => {
    try {
      setLoading(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL || "/default-profile.png",
        });
        await storeUserInformation(
          currentUser?.uid,
          currentUser?.email,
          currentUser?.displayName,
          currentUser?.photoURL
        );
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    loading,
    setLoading,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
    signOutUser,
  };

  // Render spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
