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

function ProjectPage() {
	const [project, setProject] = useState([]);
	const navigate = useNavigate();
	const [countProject, setCountProject] = useState(0);

	const fetchProject = async () => {
		try {
			const response = await axios.get('http://localhost:4000/listProject');
			setProject(response.data);
			setCountProject(response.data.length);
		} catch (error) {
			console.error(
				'Hakkımda listesi getirilirken hata oluştu:',
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		fetchProject();
	}, []);

	const deleteProject = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteProject', { _id });
			if (response.status === 200) {
				alert('Seçili proje silindi');
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('Proje silinirken hata oluştu: Proje bilgisi bulunamadı');
			}
		} finally {
			fetchProject();
		}
	};

	const updateProject = (_id) =>
		navigate('/Project/UpdateProject', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader title={`Proje Sayısı: ${countProject}`} />
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/Project/AddProject')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Proje Ekle
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Proje Resimi</TableCell>
							<TableCell>Baslık</TableCell>
							<TableCell>Pozisyon</TableCell>
							<TableCell>tech1</TableCell>
							<TableCell>tech2</TableCell>
							<TableCell>tech3</TableCell>
							<TableCell>tech4</TableCell>
							<TableCell>Proje Linki</TableCell>
							<TableCell>Butonlar</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{project.length > 0 ? (
							project.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										{item.projectImage ? (
											<img
												style={{
													width: '100px',
													height: '100px',
													borderRadius: '50%',
													objectFit: 'cover',
												}}
												src={item.projectImage}
												alt="proje resimi"
											/>
										) : null}
									</TableCell>
									<TableCell>{item.title || ''}</TableCell>
									<TableCell>{item.position || ''}</TableCell>
									<TableCell>{item.tech1 || ''}</TableCell>
									<TableCell>{item.tech2 || ''}</TableCell>
									<TableCell>{item.tech3 || ''}</TableCell>
									<TableCell>{item.tech4 || ''}</TableCell>
									<TableCell>{item.link || ''}</TableCell>

									<TableCell>
										<Tooltip title="Proje Detayları" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => updateProject(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Projeyi Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteProject(item._id)}
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

export default ProjectPage;
