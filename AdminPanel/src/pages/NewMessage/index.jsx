import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Card,
	CardHeader,
	TableRow,
	TableCell,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Paper,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios';

function MessagePage() {
	const [message, setMessage] = useState([]);
	const [lengtMessage, setLengthMessage] = useState(0);
	const navigate = useNavigate();

	const fetchMessage = async () => {
		try {
			const response = await axios.get('http://localhost:4000/newListMessage');
			setMessage(response.data);
			setLengthMessage(response.data.length);
		} catch (error) {
			setMessage([]);
		}
	};

	useEffect(() => {
		fetchMessage();
	}, []);

	const messageDetails = (_id) =>
		navigate('/NewMessage/DetailsMessage', {
			state: {
				_id,
			},
		});

	return (
		<Card component="section" className="mt-5">
			<CardHeader
				title={`Gelen Kutusu (${lengtMessage} Mesaj)`}
				subheader="İletişim kısmından gönderilen mesajlarınız"
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Ad Soyad</TableCell>
							<TableCell>E-Posta Adresi</TableCell>
							<TableCell>Mesaj Başlığı</TableCell>
							<TableCell>Mesaj</TableCell>
							<TableCell>Gönderim Tarihi</TableCell>
							<TableCell>Durumu </TableCell>
							<TableCell>Oku </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{message.length > 0 ? (
							message.map((item, index) => (
								<TableRow
									key={item._id}
									hover
									tabIndex={-1}
									style={{
										backgroundColor: 'rgba(255, 0, 0, 0.1)',
									}}
								>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.fullName || ''}</TableCell>
									<TableCell>{item.email || ''}</TableCell>
									<TableCell>{item.title || ''}</TableCell>
									<TableCell>
										{item.message.length > 50
											? `${item.message.slice(0, 50)}...`
											: item.message || ''}
									</TableCell>
									<TableCell>{item.date || ''}</TableCell>

									<TableCell>
										<div className="text-center">❌</div>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											type="button"
											variant="contained"
											color="primary"
											onClick={() => messageDetails(item._id)}
										>
											Mesajı Aç
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align="center">
									Mesaj yok
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

export default MessagePage;
