import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
	const token = localStorage.getItem('token');
	const expirationTime = localStorage.getItem('expirationTime');

	useEffect(() => {
		const checkTokenExpiration = () => {
			if (expirationTime && new Date().getTime() > expirationTime) {
				localStorage.removeItem('token');
				localStorage.removeItem('expirationTime');
				window.location.href = '/';
			}
		};

		// Sayfa yüklendiğinde ve her 1 dakikada bir token'ı kontrol et
		checkTokenExpiration();
		const intervalId = setInterval(checkTokenExpiration, 60 * 1000);
		return () => clearInterval(intervalId);
	}, [expirationTime]);

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}

export default AuthRoute;
