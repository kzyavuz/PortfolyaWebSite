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

function AboutPage() {
	const [about, setAbout] = useState([]);
	const [countAbout, setCountAbout] = useState(0);
	const navigate = useNavigate();
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const fetchAbout = async () => {
		try {
			const response = await axios.get('http://localhost:4000/listAbout');
			setAbout(response.data);
			setCountAbout(response.data.length);
		} catch (error) {
			setAbout([]);
		}
	};

	useEffect(() => {
		fetchAbout();
	}, []);

	const deleteAbout = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteAbout', { _id });
			if (response.status === 200) {
				setSnackbarMessage('Hakkımda bilgisi silindi');
				setSnackbarSeverity('success');
			}
		} catch (error) {
			setSnackbarMessage('Bir hata oluştu');
			setSnackbarSeverity('error');
		} finally {
			fetchAbout();
		}
	};

	const aboutUpdate = (_id) =>
		navigate('/About/UpdateAbout', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader
				title={`Hakkımda Bilgisi (${countAbout})`}
				subheader="Sitede en son eklenen hakkımda bilgisi gözükmektedir."
			/>
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/About/AddAbout')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Hakkımda Bilgisi Ekle
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Fotograf</TableCell>
							<TableCell>Baslık</TableCell>
							<TableCell>Acıklama</TableCell>
							<TableCell>Işlemler</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{about.length > 0 ? (
							about.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										{item.profilePicture ? (
											<img
												style={{
													width: '100px',
													height: '100px',
													borderRadius: '50%',
													objectFit: 'cover',
												}}
												src={item.profilePicture}
												alt="profil fotoğrafı"
											/>
										) : null}
									</TableCell>
									<TableCell>{item.title || ''}</TableCell>
									<TableCell>
										{item.description.length > 50
											? `${item.description.slice(0, 50)}...`
											: item.description || ''}
									</TableCell>

									<TableCell>
										<Tooltip title="Hakkımda Detay" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => aboutUpdate(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Hakkımda Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteAbout(item._id)}
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

export default AboutPage;
