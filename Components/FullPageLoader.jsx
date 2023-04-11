import React from "react";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const FullPageLoader = () => (
  <div style={styles.container}>
    <p>Loading...</p>
  </div>
);

export default FullPageLoader;
