import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { IconButton, InputAdornment } from '@mui/material';
import NotificationSnackbar from '../Global/NotificationSnackbar';
// Icons
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function LoginSimple() {
	return (
		<Card
			hover={false}
			elevation={20}
			sx={{
				display: 'block',
				width: {
					xs: '95%',
					sm: '55%',
					md: '35%',
					lg: '25%',
				},
			}}
		>
			<Stack direction="column" spacing={5}>
				<div>
					<Typography variant="h1">Giriş Sayfası</Typography>
					<Typography variant="body2" color="textSecondary">
						Bilgileri girerek oturum açın.
					</Typography>
				</div>

				<LoginForm />
			</Stack>
		</Card>
	);
}

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000;
	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setSnackbarMessage(null);
		try {
			const response = await axios.post('http://localhost:4000/SignIn', {
				email,
				password,
			});

			if (response.status === 200) {
				const { token, user } = response.data;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('expirationTime', expirationTime);

				setIsLoading(false);
				setSnackbarMessage('Giriş Başarılı');
				setSnackbarSeverity('success');

				setTimeout(() => {
					navigate('/About');
				}, 1000);
			}
		} catch (error) {
			setSnackbarMessage('Kullanıcı adı veya sifre hatalı');
			setSnackbarSeverity('error');
		}
		setIsLoading(false);
	};

	return (
		<>
			<NotificationSnackbar message={snackbarMessage} severity={snackbarSeverity} />
			<form onSubmit={handleSubmit}>
				<TextField
					autoFocus
					color="primary"
					name="email"
					label="Email"
					margin="normal"
					variant="outlined"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<TextField
					color="primary"
					name="password"
					type={showPassword ? 'text' : 'password'}
					margin="normal"
					label="Password"
					variant="outlined"
					fullWidth
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton aria-label="Şifreyi göster" onClick={handleClickShowPassword} edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
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
					Giriş Yap
				</Button>
			</form>
		</>
	);
}

export default LoginSimple;
