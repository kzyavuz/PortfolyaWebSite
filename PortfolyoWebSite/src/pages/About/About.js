import React, { useEffect, useState } from 'react';
import './About.css';
import Jump from 'react-reveal/Jump';
import axios from 'axios';

const About = () => {
	const [about, setAbout] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchAbout = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/getOneAbout');
			setAbout(response.data);
		} catch (error) {
			setAbout([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAbout();
	}, []);
	return (
		<>
			<Jump>
				<div className="about" id="about">
					<div className="row">
						{about ? (
							<>
								<div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
									<img src={about.profilePicture} alt="profile_pic" />
								</div>
								<div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-content">
									<h1>{about.title}</h1>
									<p>{about.description}</p>
								</div>
							</>
						) : null}
					</div>
				</div>
			</Jump>
		</>
	);
};

export default About;
