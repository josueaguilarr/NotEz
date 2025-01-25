import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { Title } from "./Title";

export const Header: React.FC = () => {

  return (
    <header className="flex items-center justify-between mb-16">
      <Title />

      <LoginButton />     
      <LogoutButton />     
    </header>
  );
};
