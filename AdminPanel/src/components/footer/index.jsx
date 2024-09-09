import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Footer() {
	return (
		<Box
			bgcolor={(theme) => theme.palette.background.paper}
			py={3}
			borderTop={1}
			height="10vh"
			borderColor="cuaternary.300"
		>
			<Container maxWidth="lg" component={Stack} direction="column" spacing={5}>
				<Grid container spacing={3} alignContent="center" justifyContent="center" alignItems="center" />
			</Container>
		</Box>
	);
}
export default Footer;
