import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// Icons
import LoginIcon from '@mui/icons-material/Login';

// assets
import logo from '@/assets/images/logo/png/Color_logo_nobg.png';
import axios from '../../axios';

function SignupPage() {
	return (
		<Card
			elevation={20}
			sx={{
				display: 'block',
				width: {
					xs: '95%',
					sm: '450px ',
					md: '50%',
					lg: '30%',
				},
			}}
			hover={false}
		>
			<Stack direction="column" spacing={3}>
				<div>
					<Typography variant="h1">Yeni Hesap Oluştur</Typography>
					<Typography variant="body2" color="textSecondary">
						Yeni bir admin oluşturmak iştediğine eminmisin.
					</Typography>
				</div>

				<LoginForm />
			</Stack>
		</Card>
	);
}

function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await axios.post('http://localhost:4000/SignUp', {
				name,
				surname,
				email,
				password,
			});
			if (response.status === 200) {
				alert('Kayıt olundu');
			}
		} catch {
			alert('Bir hata oluştu');
		} finally {
			setIsLoading(false);
			setTimeout(() => {
				navigate('/Users');
			}, 1000);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				color="primary"
				autoFocus
				value={name}
				onChange={(e) => setName(e.target.value)}
				label="Ad"
				margin="normal"
				variant="outlined"
				fullWidth
				required
			/>
			<TextField
				color="primary"
				value={surname}
				onChange={(e) => setSurname(e.target.value)}
				label="Soyad"
				margin="normal"
				variant="outlined"
				fullWidth
				required
			/>
			<TextField
				color="primary"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label="Email"
				margin="normal"
				variant="outlined"
				fullWidth
				required
			/>
			<TextField
				color="primary"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				margin="normal"
				label="Sifre"
				variant="outlined"
				fullWidth
				required
			/>

			<Button
				sx={{
					mt: 2,
					textTransform: 'uppercase',
					color: 'primary.contrastText',
					' &:not(:disabled)': {
						background: (theme) =>
							`linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
					},
					'&:hover': {
						background: (theme) =>
							`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.tertiary.dark} 100%)`,
					},
				}}
				type="submit"
				variant="contained"
				disabled={isLoading}
				endIcon={
					isLoading ? (
						<CircularProgress
							color="secondary"
							size={25}
							sx={{
								my: 'auto',
							}}
						/>
					) : (
						<LoginIcon />
					)
				}
				fullWidth
				color="primary"
			>
				Kayıt Ol
			</Button>
		</form>
	);
}

export default SignupPage;
