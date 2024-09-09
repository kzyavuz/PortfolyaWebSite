import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineMenuFold } from 'react-icons/ai';
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
import './MobileNav.css';
const MobileNav = () => {
	const [open, setOpen] = useState(false);

	//handle open
	const handleOpen = () => {
		setOpen(!open);
	};

	// handle menu clicks
	const handleMenuClick = () => {
		setOpen(false);
	};
	return (
		<>
			<div className="mobile-nav">
				<div className="mobile-nav-header">
					{open ? (
						<AiOutlineMenuFold size={30} className="mobile-nav-icon" onClick={handleOpen} />
					) : (
						<GiHamburgerMenu size={30} className="mobile-nav-icon" onClick={handleOpen} />
					)}

					<span className="mobile-nav-title">Yavuz Koz </span>
				</div>
				{open && (
					<div className="mobile-nav-menu">
						<div className="nav-items">
							<div className="nav-item">
								<div className="nav-link">
									<Link
										to="home"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcHome />
										Ana Sayfa
									</Link>
								</div>
								<div className="nav-link">
									<Link
										to="about"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcAbout />
										Hakkımda
									</Link>
								</div>
								<div className="nav-link">
									<Link
										to="techstack"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcBiotech />
										Teknlojiler
									</Link>
								</div>

								<div className="nav-link">
									<Link
										to="projects"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcVideoProjector />
										Projeler
									</Link>
								</div>
								<div className="nav-link">
									<Link
										to="work"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcPortraitMode />
										İş Deneyimi
									</Link>
								</div>
								<div className="nav-link">
									<Link
										to="education"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcReadingEbook />
										Eğitim
									</Link>
								</div>

								<div className="nav-link">
									<Link
										to="contact"
										spy={true}
										smooth={true}
										offset={-100}
										duration={100}
										onClick={handleMenuClick}
									>
										<FcBusinessContact />
										İletişim
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MobileNav;
