import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="text-neutral-200 bg-[#3178C6] font-semibold px-2.5 py-1 rounded-md"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}    >
      Cerrar sesión
    </button>
  );
};
