// generic libraries
import { Routes, Route } from "react-router-dom";

// project specific components
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import Profile from "./Profile";
import Collection from "./Collection";
import AddNewGame from "./AddNewGame";
import GameCalendar from "./GameCalendar";

const MainContent = ({ children }) => {


    return (
        <>
            <Routes>
            <Route index element={<Homepage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="collection" element={<Collection />} />
                <Route path="addgame" element={<AddNewGame />} />
                <Route path="calendar" element={<GameCalendar />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
    
}

export default MainContent;