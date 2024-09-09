import React, { useEffect, useState } from 'react';
import './Menus.css';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import {
	FcAbout,
	FcBiotech,
	FcBusinessContact,
	FcHome,
	FcPortraitMode,
	FcReadingEbook,
	FcVideoProjector,
} from 'react-icons/fc';
import axios from 'axios';
const Menus = ({ toggle }) => {
	const [proiflePicture, setProfilePicture] = useState();
	const fetchAbout = async () => {
		try {
			const response = await axios.get('http://localhost:4000/getOneAbout');
			if (response.status === 200) {
				setProfilePicture(response.data.profilePicture);
			}
		} catch (error) {
			setProfilePicture([]);
		}
	};
	useEffect(() => {
		fetchAbout();
	}, []);
	return (
		<>
			{toggle ? (
				<>
					<Zoom>
						<div className="navbar-profile-pic">
							<img src={proiflePicture} alt="profile pic" />
						</div>
					</Zoom>
					<Fade left>
						<div className="nav-items">
							<div className="nav-item">
								<div className="nav-link">
									<Link to="home" spy={true} smooth={true} offset={-100} duration={100}>
										<FcHome />
										Ana Sayfa
									</Link>
								</div>
								<div className="nav-link">
									<Link to="about" spy={true} smooth={true} offset={-100} duration={100}>
										<FcAbout />
										Hakkımda
									</Link>
								</div>

								<div className="nav-link">
									<Link to="techstack" spy={true} smooth={true} offset={-100} duration={100}>
										<FcBiotech />
										Teknolojiler
									</Link>
								</div>

								<div className="nav-link">
									<Link to="projects" spy={true} smooth={true} offset={-100} duration={100}>
										<FcVideoProjector />
										Projelerim
									</Link>
								</div>

								<div className="nav-link">
									<Link to="work" spy={true} smooth={true} offset={-100} duration={100}>
										<FcPortraitMode />
										İş Deneyimi
									</Link>
								</div>

								<div className="nav-link">
									<Link to="education" spy={true} smooth={true} offset={-100} duration={100}>
										<FcReadingEbook />
										Eğitim
									</Link>
								</div>

								<div className="nav-link">
									<Link to="contact" spy={true} smooth={true} offset={-100} duration={100}>
										<FcBusinessContact />
										İletişim
									</Link>
								</div>
							</div>
						</div>
					</Fade>
				</>
			) : (
				<>
					<div className="nav-items">
						<div className="nav-item">
							<div className="nav-link">
								<Link to="home" spy={true} smooth={true} offset={-100} duration={100}>
									<FcHome />
								</Link>
							</div>
							<div className="nav-link">
								<Link to="about" spy={true} smooth={true} offset={-100} duration={100}>
									<FcAbout />
								</Link>
							</div>
							<div className="nav-link">
								<Link to="education" spy={true} smooth={true} offset={-100} duration={100}>
									<FcBiotech />
								</Link>
							</div>

							<div className="nav-link">
								<Link to="techstack" spy={true} smooth={true} offset={-100} duration={100}>
									<FcVideoProjector />
								</Link>
							</div>

							<div className="nav-link">
								<Link to="projects" spy={true} smooth={true} offset={-100} duration={100}>
									<FcPortraitMode />
								</Link>
							</div>
							<div className="nav-link">
								<Link to="work" spy={true} smooth={true} offset={-100} duration={100}>
									<FcReadingEbook />
								</Link>
							</div>
							<div className="nav-link">
								<Link to="contact" spy={true} smooth={true} offset={-100} duration={100}>
									<FcBusinessContact />
								</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Menus;
