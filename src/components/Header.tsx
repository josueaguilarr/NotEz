import { SupabaseClient } from "@supabase/supabase-js";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import { GithubIcon } from "../icons/Icons";

type Props = {
  sbClient: SupabaseClient;
};

export const Header: React.FC<Props> = ({ sbClient }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInWithGithub = async (): Promise<void> => {
    const { error } = await sbClient.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) return;
  };

  const signOutGithub = async (): Promise<void> => {
    const { error } = await sbClient.auth.signOut();

    if (error) return;

    await isUserAuthenticated();
  };

  const isUserAuthenticated = async () => {
    const { data } = await sbClient.auth.getSession();

    if (data.session) {
      setIsAuthenticated(!isAuthenticated);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <header className="flex items-center justify-between mb-16">
      <Title />

      <button
        onClick={isAuthenticated ? signOutGithub : signInWithGithub}
        className="flex gap-1 items-center text-neutral-200 bg-[#3178C6] font-semibold px-2.5 py-1.5 rounded-md hover:scale-105 duration-300"
      >
        
        {!isAuthenticated && <GithubIcon className="size-[14px]" />}
        {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
      </button>
    </header>
  );
};
