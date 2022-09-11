import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMeetUps from "./pages/AddMeetUps";
import Favorites from "./pages/Favorites";
import { MeetupsContextProvider } from "./store/meetups-context";

const App = () => {
  return (
    <MeetupsContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-meetup" element={<AddMeetUps />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </MeetupsContextProvider>
  );
};

export default App;