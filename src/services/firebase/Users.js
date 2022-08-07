import * as firebase from "./firebase";

export async function SignInWithEmailPassword(email, password) {

  const res = await firebase.SignInWithEmailPassword(email, password);
  return res;
}
export async function RegisterWithEmailPassword(email, password) {
  const res = await firebase.SignUpWithEmail(email, password);
  return res;
}
export async function SignInWithGoogle() {
  const res = await firebase.signInWithGoogleProvider();
  return res;
}
