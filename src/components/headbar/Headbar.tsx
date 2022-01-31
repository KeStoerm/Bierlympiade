import { getAuth, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import { authenticateWithGoogle } from "../../authentication/authenticationUtils";
import googleLoginLogo from "../../btn_google.png"

export const Headbar = (): JSX.Element => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  console.log(user);

  const login = async () => {
    authenticateWithGoogle();
  };

  const logout = async () => {
    await signOut(auth);
  }
  

  return <div className="header w-full py-1 px-2 h-12 mb-2 bg-secondary flex">
    <div className="flex flex-grow items-center h-full">
      
    </div>
    <div className="flex flex-grow justify-end items-center h-full">
      {user
      ? <>
          <p className="text-accent">Eingeloggt als: {user.displayName}</p>
          <i onClick={logout} className="pl-3 text-accent fas fa-sign-out-alt text-xl" />
        </>
      : <img src={googleLoginLogo} onClick={login} alt="google login" className="cursor-pointer h-full" />}
    </div>
</div>
}