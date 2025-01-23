import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserProps = User | null;

type AuthStoreProps = {
  user: UserProps;
  loadingUser: boolean;
  checkUserSession: VoidFunction;
  signOut: VoidFunction;
  authenticate: VoidFunction;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
  user: null,
  loadingUser: true,

  checkUserSession: async () => {
    try {
      set({ 
        loadingUser: true,
      });

      const { data } = await supabase.auth.getUser();

      set(() => ({ user: data.user, loadingUser: false }));
    } catch (error) {
      console.log(error)
    } finally {
      set({ 
        loadingUser: false
      })
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set(() => ({ user: null }));
    } catch (error) {}
  },

  authenticate: async () => {
    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));
