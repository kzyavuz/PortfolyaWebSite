import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios';
// import NotificationSnackbar from '../Global/NotificationSnackbar';

function DetailsMessage() {
	const location = useLocation();
	const { _id } = location.state;
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [date, setDate] = useState('');
	const [fullName, setFullName] = useState('');
	const [loading, setLoading] = useState(false);

	const readMessage = async () => {
		try {
			await axios.post('http://localhost:4000/readMessage', {
				_id,
			});
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('mesaj bulunamadı');
			} else {
				alert('bir hata oluştu');
			}
		}
	};
	const fetchMessage = async () => {
		try {
			const response = await axios.post('http://localhost:4000/detailsMessage', {
				_id,
			});
			setTitle(response.data.title);
			setMessage(response.data.message);
			setDate(response.data.date);
			setFullName(response.data.fullName);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('Eğitim bilgisi bulunamadı');
			} else {
				alert('bir hata oluştu');
			}
		}
	};

	useEffect(() => {
		fetchMessage();
		readMessage();
	}, []);

	if (loading) {
		return <div>Yükleniyor...</div>;
	}

	return (
		<Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, mt: 5 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Gelen Mesaj
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField label="GÖnderen Ad Soyad" value={fullName} fullWidth margin="normal" required />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Gönderim Tarihi" value={date} fullWidth margin="normal" required />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Mesaj Baslğı" value={title} fullWidth margin="normal" required />
						<TextField
							label="Mesaj"
							value={message}
							fullWidth
							rows={15}
							multiline
							margin="normal"
							required
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default DetailsMessage;
