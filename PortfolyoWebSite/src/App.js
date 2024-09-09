import Layout from './components/Layout/Layout';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Education from './pages/Educations/Education';
import Projects from './pages/Projects/Projects';
import Techstack from './pages/Techstack/Techstack';
import WorkExp from './pages/workExp/WorkExp';
import ScrollToTop from 'react-scroll-to-top';
import { useTheme } from './context/ThemeContext';
import MobileNav from './components/MobileNav/MobileNav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [theme] = useTheme();
	return (
		<>
			<div id={theme}>
				<ToastContainer />
				<MobileNav />
				<Layout />
				<div className="container">
					<About />
					<Techstack />
					<Projects />
					<WorkExp />
					<Education />
					<Contact />
				</div>
				<div className="footer pb-3 ms-3">
					<h4 className="text-center">By KOZLOW &copy; 2024</h4>
				</div>
			</div>
			<ScrollToTop
				smooth
				color="#138781"
				style={{ backgroundColor: '#1e1e2c', borderRadius: '80px', boxShadow: '0px 2px 8px 4px #757575' }}
			/>
		</>
	);
}

export default App;
