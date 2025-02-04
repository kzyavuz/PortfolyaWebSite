import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { TextField, Button, Card, CardContent, Typography, Grid, InputLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateProject() {
	const location = useLocation();
	const { _id } = location.state;
	const [title, setTitle] = useState('');
	const [position, setPosition] = useState('');
	const [tech1, setTech1] = useState('');
	const [tech2, setTech2] = useState('');
	const [tech3, setTech3] = useState('');
	const [tech4, setTech4] = useState('');
	const [link, setLink] = useState('');
	const [projectImage, setProjectImage] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const style = {
		img: {
			width: '100px',
			height: '100px',
			objectFit: 'cover',
			borderRadius: '10%',
			marginBottom: '10px',
		},
		button: {
			width: '100px',
			height: '50px',
			margin: '10px',
			display: 'flex',
			float: 'right',
		},
	};

	const fetchData = async () => {
		try {
			const result = await axios.post('http://localhost:4000/detailsProject/', {
				_id,
			});
			setTitle(result.data.title);
			setPosition(result.data.position);
			setTech1(result.data.tech1);
			setTech2(result.data.tech2);
			setTech3(result.data.tech3);
			setTech4(result.data.tech4);
			setLink(result.data.link);
			setProjectImage(`data:image/jpeg;base64,${result.data.projectImage}`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [_id]);

	const handleprojectImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setProjectImage(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await axios.post('http://localhost:4000/updateProject/', {
				_id,
				title,
				position,
				tech1,
				tech2,
				tech3,
				tech4,
				link,
				projectImage,
			});

			if (result.status === 200) {
				alert('Projenin bilgileri güncellendi');
			}
		} catch (error) {
			if (error.response && error.response.status === 406) {
				alert('Hata: Zorunu alanları doldurunuz');
			} else {
				alert('Hata: Bir hata oluştu');
			}
		} finally {
			setLoading(false);
		}
	};

	const projectImagePreviewUrl = projectImage || null;

	if (loading) {
		return <div>Yükleniyor...</div>;
	}

	return (
		<Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, mt: 5 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Hakkımda bilgisi güncelleme alanı
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Projenin Adı"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								fullWidth
								variant="outlined"
								margin="normal"
								required
							/>
							<TextField
								label="Pozisyon Bilgisi"
								value={position}
								onChange={(e) => setPosition(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="Kullanılan Teknolojiler 1"
								value={tech1}
								onChange={(e) => setTech1(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="Kullanılan Teknolojiler 2"
								value={tech2}
								onChange={(e) => setTech2(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="Kullanılan Teknolojiler 3"
								value={tech3}
								onChange={(e) => setTech3(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
							<TextField
								label="Kullanılan Teknolojiler 4"
								value={tech4}
								onChange={(e) => setTech4(e.target.value)}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="Proje Linki"
								value={link}
								onChange={(e) => setLink(e.target.value)}
								fullWidth
								margin="normal"
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel htmlFor="projectImage">Profil Resmi</InputLabel>
							<input
								type="file"
								id="projectImage"
								onChange={handleprojectImageChange}
								style={{ display: 'block', marginBottom: '20px' }}
							/>
							{projectImage && <img src={projectImagePreviewUrl} alt="Profile" style={style.img} />}
						</Grid>
					</Grid>

					<Button type="submit" variant="contained" color="primary" style={style.button}>
						{loading ? 'Yükleniyor...' : 'Güncelle'}
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

export default UpdateProject;
