import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/new-student" element={NewStudent} />
        <Route path="/students/:id" element={Student} /> */}

        {/* <Route path=":id" element={<Team />} />
          <Route path="new-student" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
