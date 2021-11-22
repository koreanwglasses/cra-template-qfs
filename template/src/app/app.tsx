import "./App.css";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box>
      {/**
       * <Outlet/> is a component used by react router to render pages.
       * See: https://reactrouter.com/docs/en/v6/getting-started/concepts#outlets
       */}
      <Outlet />
    </Box>
  );
}

export default App;
