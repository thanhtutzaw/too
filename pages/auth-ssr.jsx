import React from "react";
import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import GoogleLogin from "../Components/Login/GoogleLogin";
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
})();

export default withAuthUser({
})(Auth);
