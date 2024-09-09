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

function EducationPage() {
	const [education, setEducation] = useState([]);
	const navigate = useNavigate();
	const [countEducation, setCountEducation] = useState(0);

	const fetchEducation = async () => {
		try {
			const response = await axios.get('http://localhost:4000/listEducation');
			setEducation(response.data);
			setCountEducation(response.data.length);
		} catch (error) {
			setEducation([]);
		}
	};

	useEffect(() => {
		fetchEducation();
	}, []);

	const deleteEducation = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteEducation', { _id });
			if (response.status === 200) {
				alert('Eğitim bilgisi silindi');
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('Eğitim bilgisi silinirken hata oluştu: Eğitim bilgisi bulunamadı');
			}
		} finally {
			fetchEducation();
		}
	};

	const educationUpdate = (_id) =>
		navigate('/Education/UpdateEducation', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader
				title={`Eğitim Hayatı Bilgisileri (${countEducation})`}
				subheader="Eğitim Bilgileri lisstesi."
			/>
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/Education/AddEducation')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Eğitim Bilgisi Ekle
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Başlık</TableCell>
							<TableCell>Açıklama</TableCell>
							<TableCell>Eğitim Yılı</TableCell>
							<TableCell>Işlemler</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{education.length > 0 ? (
							education.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.title || ''}</TableCell>
									<TableCell>
										{item.description.length > 50
											? `${item.description.slice(0, 50)}...`
											: item.description || ''}
									</TableCell>
									<TableCell>{item.date || ''}</TableCell>

									<TableCell>
										<Tooltip title="Eğitim Detayı" arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => educationUpdate(item._id)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Eğitmi Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteEducation(item._id)}
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

export default EducationPage;
