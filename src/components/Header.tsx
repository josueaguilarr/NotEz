import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { Title } from "./Title";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="flex items-center justify-between mb-16">
      <Title />

      {isAuthenticated ? (<LogoutButton />) : (<LoginButton />)}      
    </header>
  );
};
