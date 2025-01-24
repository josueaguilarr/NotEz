import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="text-neutral-200 bg-[#3178C6] font-semibold px-2.5 py-1 rounded-md"
      onClick={() => loginWithRedirect()}
    >
      Iniciar sesión
    </button>
  );
};
