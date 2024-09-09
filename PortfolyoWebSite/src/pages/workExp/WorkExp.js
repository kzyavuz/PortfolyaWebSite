import React, { useEffect, useState } from 'react';
import { SiReact } from 'react-icons/si';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './WorkExp.css';
import axios from 'axios';
const WorkExp = () => {
	const [works, setWork] = useState([]);
	const [loading, setLoading] = useState(false);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('tr-TR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(date);
	};
	const fetchWork = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/listWork');
			setWork(response.data);
		} catch (error) {
			setWork([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchWork();
	}, []);
	return (
		<>
			<div className="work" id="work">
				<div className="container work-exp">
					<h2 className="col-12 mt-3 mb-1 text-center">İŞ DENEYİMLERİM</h2>
					<hr id="work-hr" />
					<VerticalTimeline lineColor="#1e1e2c">
						{works.map((work) => (
							<VerticalTimelineElement
								key={work._id}
								className="vertical-timeline-element--work"
								contentStyle={{ background: 'white', color: '#1e1e2c' }}
								contentArrowStyle={{
									borderRight: '7px solid  white',
								}}
								date={<span id="work-date">{formatDate(work.date)}</span>}
								iconStyle={{ background: '#1e1e2c', color: '#fff' }}
								icon={<SiReact />}
							>
								<h3 className="vertical-timeline-element-subtitle">{work.name}</h3>
								<h5 className="vertical-timeline-element-title">{work.position}</h5>
								<hr />
								<h5>{work.title}</h5>
								<p>{work.description}</p>
							</VerticalTimelineElement>
						))}
					</VerticalTimeline>
				</div>
			</div>
		</>
	);
};

export default WorkExp;
