import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Error from './lib/layout/Error';
import ThemeManager from './lib/layout/ThemeManager';
import HomePage from './lib/pages/HomePage';
import PostPage from './lib/pages/PostPage';
import RootPageLayout from './lib/pages/RootPageLayout';

function App() {
  return (
    <ThemeManager>
      <BrowserRouter>
        <RootPageLayout>
          <Routes>
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/search/:query" element={<HomePage />} />
            <Route path="/author/:authorId" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="*"
              element={
                <Error
                  title="Error 404 - Page not found"
                  message="The page you are looking for does not exist."
                />
              }
            />
          </Routes>
        </RootPageLayout>
      </BrowserRouter>
    </ThemeManager>
  );
}

export default App;
