import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
// MUI
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import axios from 'axios';

function LoggedUser() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Menu
				elevation={26}
				sx={{
					'& .MuiMenuItem-root': {
						mt: 0.5,
					},
				}}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<UserMenu handleClose={handleClose} user={user} />
			</Menu>
			<Stack height="100%" direction="row" flex={1} justifyContent="flex-end" alignItems="center" spacing={0}>
				<ButtonBase
					onClick={handleClick}
					variant="outlined"
					sx={{
						ml: 1,
						height: '100%',
						overflow: 'hidden',
						borderRadius: '25px',
						transition: '.2s',
						px: 1,
						transitionProperty: 'background,color',
						'&:hover': {
							bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
						},
						'&:hover .MuiSvgIcon-root': {
							opacity: '1',
						},
					}}
				>
					<Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
						<Avatar
							alt="User Img"
							sx={{
								width: 35,
								height: 35,
								boxShadow: (theme) =>
									`0px 0px 0px 4px ${theme.palette.background.paper} ,0px 0px 0px 5px ${theme.palette.primary.main} `,
							}}
						/>
						<Typography
							variant="body2"
							display={{
								xs: 'none',
								sm: 'inline-block',
							}}
						>
							{user ? `${user.name}` : 'Yükleniyor...'}
						</Typography>
						<ExpandMoreIcon
							fontSize="small"
							sx={{
								transition: '0.2s',
								opacity: '0',
							}}
						/>
					</Stack>
				</ButtonBase>
			</Stack>
		</>
	);
}

function UserMenu({ handleClose = () => {}, user = null }) {
	const navigate = useNavigate();
	const [message, setMessage] = useState(0);

	const deleteToken = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const fetchMessage = async () => {
		try {
			const response = await axios.post('http://localhost:4000/countMessage');
			setMessage(response.data);
		} catch (error) {
			setMessage(0);
		}
	};

	useEffect(() => {
		fetchMessage();
	}, []);

	return (
		<MenuList
			sx={{
				p: 1,
				'& .MuiMenuItem-root': {
					borderRadius: 2,
				},
			}}
		>
			<Stack px={3}>
				<Typography variant="subtitle1" textAlign="center">
					{user ? `${user.name} ${user.surname}` : 'Yükleniyor...'}
				</Typography>
				<Typography variant="subtitle2" textAlign="center">
					{user ? user.email : 'Yükleniyor...'}
				</Typography>
			</Stack>
			<Divider
				sx={{
					borderColor: 'primary.light',
					my: 1,
				}}
			/>
			<MenuItem
				onClick={() => {
					navigate('/Users');
					handleClose();
				}}
			>
				<ListItemIcon>
					<PeopleAltIcon fontSize="small" />
				</ListItemIcon>
				Tüm Kullanıcılar
			</MenuItem>

			<MenuItem onClick={() => navigate('/SignUp')}>
				<ListItemIcon>
					<PersonAddIcon fontSize="small" />
				</ListItemIcon>
				Yeni Kullanıcısı Ekle
			</MenuItem>
			<Divider
				sx={{
					borderColor: 'primary.light',
					my: 1,
				}}
			/>
			<MenuItem
				onClick={() => {
					navigate('/NewMessage');
					handleClose();
				}}
			>
				<ListItemIcon>
					<CommentOutlinedIcon fontSize="small" />
				</ListItemIcon>
				Yeni Mesaj <ListBadge color="warning.main" count={message.count} />
			</MenuItem>
			<MenuItem onClick={deleteToken}>
				<ListItemIcon>
					<ExitToAppIcon fontSize="small" />
				</ListItemIcon>
				Çıkıs Yap
			</MenuItem>
		</MenuList>
	);
}

function ListBadge({ color, count }) {
	return (
		<Box
			ml={1}
			bgcolor={color}
			color="primary.contrastText"
			height={20}
			width={20}
			fontSize="body1"
			borderRadius="50%"
			display="grid"
			sx={{ placeItems: 'center' }}
		>
			{count}
		</Box>
	);
}
export default LoggedUser;
