import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationSnackbar from '../Global/NotificationSnackbar';

function UpdateAbout() {
	const location = useLocation();
	const { _id } = location.state;
	const [profilePicture, setProfilePicture] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const result = await axios.post('http://localhost:4000/detailsAbout/', { _id });
			setTitle(result.data.title);
			setDescription(result.data.description);
			if (result.data.profilePicture) {
				setCurrentProfilePicture(`data:image/jpeg;base64,${result.data.profilePicture}`);
			}
		} catch (error) {
			setSnackbarMessage('Veriler gelirken bir hata oluştu');
			setSnackbarSeverity('error');
		}
	};

	useEffect(() => {
		fetchData();
	}, [_id]);

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

		try {
			const result = await axios.post('http://localhost:4000/updateAbout/', {
				_id,
				title,
				description,
				profilePicture: profilePicture || currentProfilePicture,
			});

			if (result.status === 200) {
				setSnackbarMessage('Hakkımda bilgisi güncellendi');
				setSnackbarSeverity('success');
				setTimeout(() => {
					navigate('/About');
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
					Hakkımda Bilgisi Güncelleme Alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Başlık"
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
							<img
								src={profilePicture || currentProfilePicture || ''}
								alt="Profil"
								style={{
									width: '100px',
									height: '100px',
									objectFit: 'cover',
									borderRadius: '10%',
									marginBottom: '10px',
								}}
							/>
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
