import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddGroupPage from "./pages/AddGroupPage";
import GroupPage from "./pages/GroupPage";
import MyPage from "./pages/MyPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/group/:groupid" element={<GroupPage />} />
    </Routes>
  );
};

export default App;
