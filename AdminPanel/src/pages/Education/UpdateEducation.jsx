import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios';
// import NotificationSnackbar from '../Global/NotificationSnackbar';

function UpdateEducation() {
	const location = useLocation();
	const { _id } = location.state;
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const style = {
		button: {
			width: '100px',
			height: '50px',
			margin: '10px',
			display: 'flex',
			float: 'right',
		},
	};
	const fetchEducation = async () => {
		try {
			const response = await axios.post('http://localhost:4000/datailsEducation/', {
				_id,
			});
			setTitle(response.data.title);
			setDescription(response.data.description);
			setDate(response.data.date);
		} catch (error) {
			alert('Hata: Bir hata oluştu');
		}
	};

	useEffect(() => {
		fetchEducation();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await axios.post('http://localhost:4000/updateEducation', {
				_id,
				title,
				description,
				date,
			});

			if (result.status === 200) {
				alert('Eğitim bilgisi güncellendi');
			}
		} catch (error) {
			if (error.response && error.response.status === 406) {
				alert('Tüm alanları doldurunuz');
			} else {
				alert('Hata: Bir hata oluştu');
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
					Eğitim bilgisi ekleme alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Başlık"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								fullWidth
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

							<TextField
								label="Tarih (2020 - 2024)"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
						</Grid>
					</Grid>

					<Button type="submit" variant="contained" color="primary" style={style.button}>
						{loading ? 'Yükleniyor...' : 'Güncelle'}
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
		</Card>
	);
}

export default UpdateEducation;
