import React from "react";
import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import GoogleLogin from "../Components/GoogleLogin";
import Layout from "../Components/Layout.jsx";

const Auth = () => (
  <>
    <h3>Sign in ssr</h3>

    <GoogleLogin />
  </>
);
Auth.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = withAuthUserTokenSSR({
  // whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  // whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth);
