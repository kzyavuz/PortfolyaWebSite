import React, { useEffect, useState } from 'react';
import './Projects.css';
import RubberBand from 'react-reveal/RubberBand';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchProject = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/listProject');
			setProjects(response.data);
		} catch (error) {
			setProjects([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchProject();
	}, []);
	return (
		<>
			<div className="continer project" id="projects">
				<RubberBand>
					<h2 className="col-12 mt-3 mb-1 text-center text-uppercase">Projerlim</h2>
					<hr />
					<p className="pb-3 text-center">burada açıklama var</p>
				</RubberBand>
				<div className="row" id="ads">
					{projects.map((project) => (
						<Fade key={project._id} left>
							<div className="col-md-4 ">
								<div className="card rounded">
									<div className="card-image">
										<span className="card-notify-badge">{project.position}</span>
										<img src={project.projectImage} alt={project.title} />
									</div>
									<div className="card-image-overly m-auto mt-3">
										{project.tech1 && <span className="card-detail-badge">{project.tech1}</span>}
										{project.tech2 && <span className="card-detail-badge">{project.tech2}</span>}
										{project.tech3 && <span className="card-detail-badge">{project.tech3}</span>}
										{project.tech4 && <span className="card-detail-badge">{project.tech4}</span>}
									</div>
									<div className="card-body text-center">
										<div className="ad-title m-auto">
											<h5 className="text-uppercase">{project.title}</h5>
										</div>
										<a className="ad-btn" target="_blank" href={project.link}>
											View
										</a>
									</div>
								</div>
							</div>
						</Fade>
					))}
				</div>
			</div>
		</>
	);
};

export default Projects;
