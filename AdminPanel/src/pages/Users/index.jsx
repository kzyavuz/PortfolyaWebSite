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

function UserPage() {
	const [user, setUser] = useState([]);
	const navigate = useNavigate();
	const [constUser, setConstUser] = useState(0);

	const fetchUser = async () => {
		try {
			const response = await axios.post('http://localhost:4000/listUser');
			setUser(response.data);
			setConstUser(response.data.length);
		} catch (error) {
			console.error(
				'Kullanıcı listesi getirilirken hata oluştu:',
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const deleteUser = async (_id) => {
		try {
			const response = await axios.post('http://localhost:4000/deleteUser', { _id });
			if (response.status === 200) {
				alert('Seçili kullanıcı silindi');
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('kullanıcı silinirken hata oluştu: Kullanıcı bilgisi bulunamadı');
			}
		} finally {
			fetchUser();
		}
	};

	const UpdateUser = (_id) =>
		navigate('/Users/UpdateUser', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader title={`Kullanıcı Sayısı: ${constUser}`} />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Adı </TableCell>
							<TableCell>Soyadı</TableCell>
							<TableCell>E-Posta</TableCell>
							<TableCell>Oluşturulma Tarihi</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.length > 0 ? (
							user.map((item, index) => (
								<TableRow key={item._id} hover tabIndex={-1}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.name || ''}</TableCell>
									<TableCell>{item.surname || ''}</TableCell>
									<TableCell>{item.email || ''}</TableCell>
									<TableCell>{item.date || ''}</TableCell>

									{/* <TableCell>
										<Tooltip title="Projeyi Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteUser(item._id)}
											>
												<DeleteIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
									</TableCell> */}
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

export default UserPage;
