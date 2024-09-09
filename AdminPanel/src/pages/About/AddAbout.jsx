import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationSnackbar from '../Global/NotificationSnackbar';

function AddEmployee() {
	const [profilePicture, setProfilePicture] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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

	const handleProfilePictureChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setProfilePicture(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSnackbarMessage(null);
		try {
			const result = await axios.post('http://localhost:4000/addAbout', {
				title,
				description,
				profilePicture,
			});

			if (result.status === 200) {
				setSnackbarMessage('Hakkımda bilgisi eklendi');
				setSnackbarSeverity('success');

				setTimeout(() => {
					navigate('/About');
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

	const profilePicturePreviewUrl = profilePicture || null;

	if (loading) {
		return <div>Yükleniyor...</div>;
	}

	return (
		<Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, mt: 5 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Hakkımda bilgisi ekleme alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Başlık"
								name="title"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								fullWidth
								variant="outlined"
								margin="normal"
								required
							/>
							<TextField
								label="Açıklama"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								fullWidth
								rows={7}
								multiline
								margin="normal"
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel htmlFor="profilePicture">Profil Resmi</InputLabel>
							<input
								type="file"
								id="profilePicture"
								onChange={handleProfilePictureChange}
								style={{ display: 'block', marginBottom: '20px' }}
							/>
							{profilePicture && <img src={profilePicture} alt="Profil" style={style.img} />}
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

export default AddEmployee;
