import React from 'react';
import { useSnackbar } from 'notistack';

function NotificationSnackbar({ message, severity = 'success', onClose }) {
	const { enqueueSnackbar } = useSnackbar();
	const prevMessageRef = React.useRef();

	React.useEffect(() => {
		// Sadece mesaj değeri gerçekten değiştiğinde Snackbar'ı tetikleyin
		if (message && message !== prevMessageRef.current) {
			enqueueSnackbar(message, {
				variant: severity,
				autoHideDuration: 3000,
				onClose: () => {
					if (onClose) {
						onClose();
					}
				},
			});
			prevMessageRef.current = message; // Geçerli mesajı saklayın
		}
	}, [message, severity, enqueueSnackbar, onClose]);

	return null;
}

export default NotificationSnackbar;
