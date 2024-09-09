import axios from '../../axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeInfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import 'bootstrap/dist/css/bootstrap.min.css';
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

function TechnologyPage() {
	const [techstack, setTechstack] = useState([]);
	const [loading, setLoading] = useState(false);
	const [countTechstack, setCountTechstack] = useState(0);

	const navigate = useNavigate();

	const fetchTechnology = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/listTechnology');
			setTechstack(response.data);
			setCountTechstack(response.data.length);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTechnology();
	}, []);

	const deleteTechnology = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteTechnology', { _id });
			if (response.status === 200) {
				alert('Seçili tekeneloji silindi');
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('Tekeneloji silinirken hata oluştu: tekeneloji bilgisi bulunamadı');
			}
		} finally {
			fetchTechnology();
		}
	};

	const updateTechnology = (_id) =>
		navigate('/Technology/UpdateTechnology', {
			state: {
				_id,
			},
		});

	if (loading) {
		return <div className="text-center">Yükleniyor...</div>;
	}
	return (
		<Card component="section" className="mt-5">
			<CardHeader title={`Kullanılan Teknoloji Adeti: ${countTechstack}`} />
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/Technology/AddTechnology')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Tekeneloji Ekle
				</Button>
			</Box>
			<TableContainer component={Paper} className="mt-3">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Tekeneloji Adı</TableCell>
							<TableCell>Eylemler</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{techstack.length > 0 ? (
							techstack.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.name || ''}</TableCell>
									<TableCell>
										<Tooltip title="tekeneloji Detayları" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => updateTechnology(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="tekenelojiyi Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteTechnology(item._id)}
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
		</Card>
	);
}

export default TechnologyPage;
