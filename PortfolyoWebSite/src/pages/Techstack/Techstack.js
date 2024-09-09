import React, { useEffect, useState } from 'react';
import './Techstack.css';
import RubberBand from 'react-reveal/RubberBand';
import Fade from 'react-reveal/Fade';
import { TechstackList } from '../../utils/TechstackList';
import axios from 'axios';

const Techstack = () => {
	const [techstack, setTechstack] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchTech = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/listTechnology');
			setTechstack(response.data);
		} catch (error) {
			setTechstack([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTech();
	}, []);

	return (
		<>
			<div className="container techstack" id="techstack">
				<RubberBand>
					<h2 className="col-12 mt-3 mb-1 text-center text-uppercase">Kullanılan Teknolojiler</h2>
					<hr />
					<p className="pb-3 text-center">Burada bir açıklama girilecek</p>
				</RubberBand>
				<div className="row">
					{techstack.map((tech) => {
						const Icon = TechstackList[tech.name]; // İkonu al
						return (
							<Fade key={tech._id} right>
								<div className="col-md-3">
									<div className="card m-2">
										<div className="card-content">
											<div className="card-body">
												<div className="media d-flex justify-content-center">
													<div className="alig-self-center">{Icon ? <Icon /> : null} </div>
													<div className="media-body">
														<h5>{tech.name}</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Fade>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Techstack;
