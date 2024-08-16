import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './components/experiencepage/content/Content';
import Header from './components/header/Header';
import HomePage from './components/homepage/HomePage';
import Login from './components/login/Login';
import Explore from './components/explorepage/Explore';
import Registration from './components/registration/Registration';
import Footer from './components/footer/Footer';
import ProfilePage from './components/profile/ProfilePage';
import ContactUs from './components/contact us/ContactUs';
import SuggestionPage from './components/suggestion/SuggestionPage/SuggestionPage';
import { Provider } from 'react-redux';
import { store } from './redux/store/Store';
import SavedPosts from './components/savedMessages/SavedMessage';
import AboutUs from './components/aboutus/AboutUs';
import PostPage from './components/postPage/PostPage';
import './App.css'
import InputPost from './components/InputPost/InputPost';
import Ex from './Ex';
function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/content" element={<Content />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
          <Route path="/saved" element={<SavedPosts/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/post" element={<PostPage/>}/>
          <Route path="/pr" element={<InputPost/>}/>
          <Route path="/e"  element={<Ex/>}/>
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
