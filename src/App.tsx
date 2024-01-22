import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GroupPage from "./pages/GroupPage";
import MyPage from "./pages/MyPage";
import MemberPage from "./pages/MemberPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/group/:groupid" element={<GroupPage />} />
      <Route path="/group/:groupid/member/:memberid" element={<MemberPage />} />
    </Routes>
  );
};

export default App;
