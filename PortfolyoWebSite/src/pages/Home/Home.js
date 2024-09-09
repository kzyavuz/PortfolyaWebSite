import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Typewriter from 'typewriter-effect';
import Cv from '../../assets/docs/Cv.pdf';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import './home.css';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

const Home = () => {
	const [home, setHome] = useState({});
	const [theme, setTheme] = useTheme();
	const [loading, setLoading] = useState(false);
	const handleTheme = () => {
		setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
	};

	const fetchHome = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/getOneHome');
			setHome(response.data);
		} catch (error) {
			setHome([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHome();
	}, []);

	return (
		<div className="container-fluid home-container" id="home">
			<div className="theme-btn" onClick={handleTheme} style={{ transition: 'all 0.3s ease-in-out' }}>
				{theme === 'light' ? <BsFillMoonStarsFill size={30} /> : <BsFillSunFill size={30} />}
			</div>

			{home && home.animationText ? (
				<div className="container home-content">
					<Fade right>
						<h2 className="introduction-text">{home.introduction}</h2>
						<h1 className="animated-text">
							<Typewriter
								options={{
									strings: home.animationText.split('&='),
									autoStart: true,
									loop: true,
									wrapperClassName: 'typewriter-wrapper',
									cursorClassName: 'typewriter-cursor',
								}}
							/>
						</h1>
					</Fade>
					<Fade bottom>
						<div className="home-buttons">
							<a
								className="btn btn-hire"
								href={`https://api.whatsapp.com/send?phone=${home.whatsappNumber}`}
								rel="noreferrer"
								target="_blank"
							>
								Whatsapp
							</a>
							<a className="btn btn-cv" href={Cv} download="Yavuz_Koz_Cv.pdf">
								Cv pdf
							</a>
							<a className="btn btn-email" href={`mailto:${home.mail}`}>
								E-Posta
							</a>
						</div>
					</Fade>
				</div>
			) : (
				<h1>Veriler Yükleniyor...</h1>
			)}
		</div>
	);
};

export default Home;
