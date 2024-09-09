import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NotificationSnackbar from '../Global/NotificationSnackbar';

function AddWork() {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [position, setPosition] = useState('');
	const [date, setDate] = useState(null);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await axios.post('http://localhost:4000/addWork', {
				name,
				title,
				description,
				position,
				date,
			});

			if (result.status === 200) {
				alert('İş geçmisi eklendi');
			}
		} catch (error) {
			if (error.response && error.response.status === 406) {
				alert('Hata: Tüm alanları doldurunuz');
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
					İş bilgisi ekleme alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Başlık"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="Pozisyon"
								value={position}
								onChange={(e) => setPosition(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="İş Adı"
								value={name}
								onChange={(e) => setName(e.target.value)}
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
								label="Tarih"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
						</Grid>
					</Grid>

					<Button type="submit" variant="contained" color="primary" style={style.button}>
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
		</Card>
	);
}

export default AddWork;
