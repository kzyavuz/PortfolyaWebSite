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

function WorkPage() {
	const [work, setwork] = useState([]);
	const navigate = useNavigate();
	const [countWork, setCountWork] = useState(0);

	const fetchWork = async () => {
		try {
			const response = await axios.get('http://localhost:4000/listWork');
			setwork(response.data);
			setCountWork(response.data.length);
		} catch (error) {
			setwork([]);
		}
	};

	useEffect(() => {
		fetchWork();
	}, []);

	const deleteWork = async (_id) => {
		try {
			await axios.post('http://localhost:4000/deleteWork', { _id });
			alert('İş bilgisi silindi');
			fetchWork();
		} catch (error) {
			alert('İş bilgisi silinirken hata oluştu!');
		}
	};

	const workUpdate = (_id) =>
		navigate('/Work/UpdateWork', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader title={`İş Geçmisi (${countWork})`} />
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/work/AddWork')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					İş Geçmisi Ekle
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>İş Adı</TableCell>
							<TableCell>Pozisyon</TableCell>
							<TableCell>Başlık</TableCell>
							<TableCell>Açıklama</TableCell>
							<TableCell>Tarih</TableCell>
							<TableCell>Eylemler</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{work.length > 0 ? (
							work.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.name || ''}</TableCell>
									<TableCell>{item.position || ''}</TableCell>
									<TableCell>{item.title || ''}</TableCell>
									<TableCell>
										{item.description.length > 100
											? `${item.description.slice(0, 100)}...`
											: item.description}
									</TableCell>
									<TableCell>{item.date || ''}</TableCell>

									<TableCell>
										<Tooltip title="Hakkımda Detay" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => workUpdate(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Hakkımda Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteWork(item._id)}
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

export default WorkPage;
