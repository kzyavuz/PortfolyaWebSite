import React, { useEffect, useState } from 'react';
import { MdSchool } from 'react-icons/md';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Education.css';
import axios from 'axios';
const Education = () => {
	const [educations, setEducations] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchEduractions = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/listEducation');
			setEducations(response.data);
		} catch (error) {
			setEducations([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchEduractions();
	}, []);
	return (
		<>
			<div className=" education" id="education">
				<h2 className="col-12 mt-3 mb-1 text-center text-uppercase">Eğitim Detayları</h2>
				<hr />
				<VerticalTimeline>
					{educations.map((education) => (
						<VerticalTimelineElement
							key={education._id}
							className="vertical-timeline-element--work"
							contentStyle={{ background: 'white', color: 'black' }}
							contentArrowStyle={{ borderRight: '7px solid  white' }}
							date={<span id="education-date">{education.date}</span>}
							iconStyle={{ background: '#138781', color: '#fff' }}
							icon={<MdSchool />}
						>
							<h3 className="vertical-timeline-element-title">{education.title}</h3>
							<h4 className="vertical-timeline-element-subtitle">{education.description}</h4>
						</VerticalTimelineElement>
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default Education;
