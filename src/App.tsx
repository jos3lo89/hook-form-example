import { Link, Route, Routes } from "react-router-dom";
import Layout1 from "./layout/Layout1";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Layout2 from "./layout/Layout2";
import Article from "./pages/Article";
import RegisterFormfile from "./pages/RegisterFormfile";
import RegisterFormZod from "./pages/RegisterFormZod";

const App = () => {
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <Link to="/">Dashboard</Link>
      <br />
      <Link to="/form-file">form file</Link>
      <br />
      <Link to="/form-zod">form zod</Link>
      <br />
      <Link to="/articles/joselo">Article</Link>
      <br />
      <Routes>
        <Route element={<Layout1 />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form-file" element={<RegisterFormfile />} />
        </Route>
        <Route element={<Layout2 />}>
          <Route path="/form-zod" element={<RegisterFormZod />} />
          <Route path="/articles/:slug" element={<Article />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
