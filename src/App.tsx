import "./App.css";
import AuthLayout from "./Layout/AuthLayout";

import MainLayout from "./Layout/Layout";

function App() {
  return (
    <AuthLayout>
      <>
        <MainLayout></MainLayout>
      </>
    </AuthLayout>
  );
}

export default App;
