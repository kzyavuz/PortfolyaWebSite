import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Contact.css';
import Jump from 'react-reveal/Jump';
import contactUsImg from '../../assets/img/ContactUS.png';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

const Contact = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [messageInfo, setMessageInfo] = useState([]);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchMessageInfo = async () => {
		try {
			const response = await axios.get('http://localhost:4000/getOneHome');
			setMessageInfo(response.data);
			console.log(messageInfo.github);
		} catch (error) {
			setTitle([]);
		}
	};
	useEffect(() => {
		fetchMessageInfo();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:4000/addMessage', {
				fullName,
				email,
				message,
				title,
			});
			if (response.status === 200) {
				toast.success('Mesajınız iletilmiş');
				setFullName('');
				setEmail('');
				setTitle('');
				setMessage('');
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				toast.error('Lütfen bilgileri eksiksiz doldurunuz');
			} else {
				toast.error(`Bir hata oluştu: ${error.response ? error.response.status : error.message}`);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Jump>
			<div className="contact" id="contact">
				<div className="card card0 border-0">
					<div className="row">
						<div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
							<div className="card1">
								<div className="row border-line">
									<img src={contactUsImg} alt="contact" className="image" />
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="card2 d-flex card border-0 px-4 py-5">
								<div className="row">
									<h6>
										İletişim
										{messageInfo.linkedin && (
											<BsLinkedin
												color="blue"
												size={30}
												className="ms-2"
												cursor={'pointer'}
												onClick={() => window.open(messageInfo.linkedin, '_blank')}
											/>
										)}
										{messageInfo.github && (
											<BsGithub
												color="black"
												size={30}
												className="ms-2"
												cursor={'pointer'}
												onClick={() => window.open(messageInfo.github, '_blank')}
											/>
										)}
										{messageInfo.instagram && (
											<BsInstagram
												color="red"
												size={30}
												className="ms-2"
												cursor={'pointer'}
												onClick={() => window.open(messageInfo.instagram, '_blank')}
											/>
										)}
									</h6>
									<div className="row px-3 mb-4">
										<div className="line" />
										<small className="or text-center">Veya</small>
										<div className="line" />
									</div>
									<form onSubmit={handleSubmit}>
										<div className="row px-3">
											<input
												type="text"
												name="name"
												placeholder="Ad soyad"
												className="mb-3"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												required
											/>
										</div>
										<div className="row px-3">
											<input
												type="email"
												name="email"
												placeholder="E-Mail Adresi"
												className="mb-3"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</div>
										<div className="row px-3">
											<input
												type="text"
												name="title"
												placeholder="Mesaj Baslığı"
												className="mb-3"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												required
											/>
										</div>
										<div className="row px-3">
											<textarea
												name="message"
												placeholder="Mesajınız"
												className="mb-3"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												required
												minLength={10}
												maxLength={300}
											/>
										</div>
										<div className="row px-3">
											<button className="button" type="submit" disabled={loading}>
												{loading ? 'Gönderiliyor...' : 'Gönder'}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Jump>
	);
};

export default Contact;
