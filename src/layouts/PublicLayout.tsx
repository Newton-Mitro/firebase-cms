import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { firebase_auth, googleProvider } from "../configs/firebase-config";

function PublicLayout() {
  return (
    <div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen w-screen bg-zinc-950 text-gray-300">
        <span className="bg-transparent">
          <button
            className="bg-transparent text-transparent"
            onClick={() => {
              signInWithPopup(firebase_auth, googleProvider)
                .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                  // const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  console.log(user);

                  // IdP data available using getAdditionalUserInfo(result)
                  // ...
                })
                .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);

                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential =
                    GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
            }}
          >
            Register
          </button>
        </span>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
