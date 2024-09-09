import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationSnackbar from '../Global/NotificationSnackbar';

function AddHome() {
	const [name, setName] = useState('');
	const [mail, setMail] = useState('');
	const [animationText, setAnimationText] = useState('');
	const [introduction, setIntroduction] = useState('');
	const [whatsappNumber, setWhatsappNumber] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const style = {
		img: {
			width: '100px',
			height: '100px',
			objectFit: 'cover',
			borderRadius: '10%',
			marginBottom: '10px',
		},
		button: {
			width: '100px',
			height: '50px',
			margin: '10px',
			display: 'flex',
			float: 'right',
		},
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSnackbarMessage(null);
		try {
			const result = await axios.post('http://localhost:4000/addHome', {
				name,
				mail,
				animationText,
				introduction,
				whatsappNumber,
			});

			if (result.status === 200) {
				setSnackbarMessage('Karsılama yazısı eklendi');
				setSnackbarSeverity('success');

				setTimeout(() => {
					navigate('/Home');
				}, 1000);
			}
		} catch (error) {
			if (error.response && error.response.status === 406) {
				setSnackbarMessage('Zorunlu alanları doldurunuz');
				setSnackbarSeverity('error');
			} else {
				setSnackbarMessage('Beklenmedik bir hata oluştu');
				setSnackbarSeverity('error');
			}
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Yükleniyor...</div>;
	}

	return (
		<Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, mt: 5 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Karsılama yazısı ekleme alanı
				</Typography>
				<form onSubmit={handleSubmit}>
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

					<Button type="submit" variant="contained" color="primary" style={style.button} disabled={loading}>
						{loading ? 'Yükleniyor...' : 'Ekle'}
					</Button>
					<Button
						type="button"
						variant="contained"
						color="error"
						onClick={() => navigate(-1)}
						style={style.button}
					>
						İptal
					</Button>
				</form>
			</CardContent>
			<NotificationSnackbar message={snackbarMessage} severity={snackbarSeverity} />
		</Card>
	);
}

export default AddHome;
