import { SupabaseClient } from "@supabase/supabase-js";
import { Title } from "./Title";
import { GithubIcon } from "../icons/Icons";

type Props = {
  sbClient: SupabaseClient;
  isAuthenticated: boolean;
  handleAuthenticated: () => void
};

export const Header: React.FC<Props> = ({ sbClient, isAuthenticated, handleAuthenticated }) => {  
  const signInWithGithub = async (): Promise<void> => {
    const { error } = await sbClient.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) return;
    handleAuthenticated()
  };

  const signOutGithub = async (): Promise<void> => {    
    const { error } = await sbClient.auth.signOut();

    if (error) return;
    handleAuthenticated();
  };

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
