import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Card,
	CardHeader,
	TableRow,
	TableCell,
	Tooltip,
	IconButton,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Paper,
	Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeInfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios';
import NotificationSnackbar from '../Global/NotificationSnackbar';

function HomePage() {
	const [home, setHome] = useState([]);
	const [countHome, setCountHome] = useState(0);
	const navigate = useNavigate();
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const fetchHome = async () => {
		try {
			const response = await axios.get('http://localhost:4000/listHome');
			setHome(response.data);
			setCountHome(response.data.length);
		} catch (error) {
			setHome([]);
		}
	};

	useEffect(() => {
		fetchHome();
	}, []);

	const deleteHome = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteHome', { _id });
			if (response.status === 200) {
				setSnackbarMessage('Karsılama yazısı silindi');
				setSnackbarSeverity('success');
			}
		} catch (error) {
			setSnackbarMessage('Bir hata oluştu');
			setSnackbarSeverity('error');
		} finally {
			fetchHome();
		}
	};

	const homeUpdate = (_id) =>
		navigate('/Home/UpdateHome', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader
				title={`Karsılama Yazısı Listesi (${countHome})`}
				subheader="Sitede en son eklenen karsılama yazısı gözükmektedir."
			/>
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/Home/AddHome')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Karsılama Yazısı Ekle
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Ad Soyad</TableCell>
							<TableCell>E-Posta Adresi</TableCell>
							<TableCell>Başlık</TableCell>
							<TableCell>Whatsapp Numarası</TableCell>
							<TableCell>Animasyonlu Yazı</TableCell>
							<TableCell>Eylemler</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{home.length > 0 ? (
							home.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										{item.name || ''} {item.surname || ''}
									</TableCell>
									<TableCell>{item.mail || ''}</TableCell>
									<TableCell>{item.introduction || ''}</TableCell>
									<TableCell>{item.whatsappNumber || ''}</TableCell>
									<TableCell>
										{item.animationText.length > 100
											? `${item.animationText.slice(0, 100)}...`
											: item.animationText || ''}
									</TableCell>

									<TableCell>
										<Tooltip title="Detay" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => homeUpdate(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Alanı Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteHome(item._id)}
											>
												<DeleteIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align="center">
									Veri bulunamadı
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<NotificationSnackbar message={snackbarMessage} severity={snackbarSeverity} />
		</Card>
	);
}

export default HomePage;
