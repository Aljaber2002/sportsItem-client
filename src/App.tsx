import "./App.css";
import AuthLayout from "./Layout/AuthLayout";

import MainLayout from "./Layout/Layout";

function App() {
  // const { data, error, isLoading } = useGetsportsItemQuery(undefined);
  // console.log(data);
  // if (isLoading) {
  //   console.log("Loading-------");
  // }
  // if (error) {
  //   console.log(error);
  // }
  return (
    <AuthLayout>
      <>
        {/* <h1 className="text-center">
        This is Assignment five project test.i want to start it
      </h1> */}

        <MainLayout></MainLayout>
      </>
    </AuthLayout>
  );
}

export default App;
