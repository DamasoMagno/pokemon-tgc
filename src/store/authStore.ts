import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "react-hot-toast"
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
      const { data } = await supabase.auth.getUser();
      set(() => ({ user: data.user }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingUser: false });
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();

      toast.success("Deslogado com sucesso.")
      set(() => ({ user: null }));
    } catch (error) {}
  },

  authenticate: async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      toast.success("Logado com sucesso.")
    } catch (error) {
      console.log(error);
    }
  },
}));
