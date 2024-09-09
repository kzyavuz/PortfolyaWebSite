import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

function MinimalLayout() {
	return (
		<Box
			component="main"
			minHeight="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundImage: (theme) =>
					theme.palette.mode === 'dark'
						? `linear-gradient(45deg, ${theme.palette.primary.dark}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary.dark}  66%, ${theme.palette.cuaternary.dark} 100%)`
						: `linear-gradient(45deg, ${theme.palette.primary[400]}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary[100]}  66%, ${theme.palette.cuaternary.main} 100%)`,

				/* backgroundImage: (theme) =>
					`linear-gradient(45deg, ${theme.palette.primary[400]}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary[100]}  66%, ${theme.palette.cuaternary.main} 100%)`,
			 */
			}}
		>
			<Outlet />
		</Box>
	);
}

export default MinimalLayout;
