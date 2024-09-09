import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationSnackbar from '../Global/NotificationSnackbar';

function UpdateAbout() {
	const location = useLocation();
	const { _id } = location.state;
	const [name, setName] = useState('');
	const [mail, setMail] = useState('');
	const [animationText, setAnimationText] = useState('');
	const [introduction, setIntroduction] = useState('');
	const [whatsappNumber, setWhatsappNumber] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const result = await axios.post('http://localhost:4000/datailsHome/', { _id });
			setAnimationText(result.data.animationText);
			setName(result.data.name);
			setMail(result.data.mail);
			setWhatsappNumber(result.data.whatsappNumber);
			setIntroduction(result.data.introduction);
		} catch (error) {
			setSnackbarMessage('Veriler gelirken bir hata oluştu');
			setSnackbarSeverity('error');
		}
	};

	useEffect(() => {
		fetchData();
	}, [_id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await axios.post('http://localhost:4000/updateHome/', {
				_id,
				name,
				mail,
				animationText,
				introduction,
				whatsappNumber,
			});

			if (result.status === 200) {
				setSnackbarMessage('Karsıalama yazısı güncellendi');
				setSnackbarSeverity('success');
				setTimeout(() => {
					navigate('/Home');
				}, 1000);
			}
		} catch (error) {
			setSnackbarMessage(error.response?.status === 406 ? 'Tüm alanları doldurunuz' : 'Bir hata oluştu');
			setSnackbarSeverity('error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, mt: 5 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Karsılama Yazısı Güncelleme Alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Ad Soyad"
									value={name}
									onChange={(e) => setName(e.target.value)}
									fullWidth
									variant="outlined"
									margin="normal"
									required
								/>
								<TextField
									label="E-Posta Adresi"
									value={mail}
									onChange={(e) => setMail(e.target.value)}
									fullWidth
									variant="outlined"
									margin="normal"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Başlık"
									value={introduction}
									onChange={(e) => setIntroduction(e.target.value)}
									fullWidth
									variant="outlined"
									margin="normal"
									required
								/>

								<TextField
									label="Whatsapp Numarası"
									value={whatsappNumber}
									onChange={(e) => setWhatsappNumber(e.target.value)}
									fullWidth
									variant="outlined"
									margin="normal"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Animasyonlu Yazı (&=) kesme işareti"
									value={animationText}
									onChange={(e) => setAnimationText(e.target.value)}
									fullWidth
									rows={7}
									multiline
									margin="normal"
									required
								/>
							</Grid>
						</Grid>
					</Grid>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{ width: '100px', height: '50px', margin: '10px', display: 'flex', float: 'right' }}
					>
						{loading ? 'Yükleniyor...' : 'Güncelle'}
					</Button>
					<Button
						type="button"
						variant="contained"
						color="error"
						onClick={() => navigate(-1)}
						style={{ width: '100px', height: '50px', margin: '10px', display: 'flex', float: 'right' }}
					>
						İptal
					</Button>
				</form>
			</CardContent>
			<NotificationSnackbar message={snackbarMessage} severity={snackbarSeverity} />
		</Card>
	);
}

export default UpdateAbout;
