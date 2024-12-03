import { create } from "zustand";
import { persist } from "zustand/middleware";

const checkLoginStatus = async () => {
  try {
    const response = await fetch("/api/users/verifyUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};


const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (status) => set({ isLoggedIn: status }), 
      initializeAuth: async () => {
        const isLoggedIn = await checkLoginStatus();
        set({ isLoggedIn });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
