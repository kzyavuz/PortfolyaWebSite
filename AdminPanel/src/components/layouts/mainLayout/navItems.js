import { v4 as uuid } from 'uuid';

import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Hakkımda',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/About',
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Projelerim',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/Project',
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Kullanılan Teknelojiler',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/Technology',
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'İş Geçmisi',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/Work',
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Eğitim Geçmisi',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/Education',
	// },
	// {
	// 	id: uuid(),
	// 	type: 'item',
	// 	title: 'Gelen Mesajlar',
	// 	Icon: WebOutlinedIcon,
	// 	href: '/Message',
	// },
	{
		id: uuid(),
		type: 'group',
		title: 'Sayfalar',
		Icon: WebOutlinedIcon,
		menuChildren: [
			{
				title: 'Hakkımda',
				href: '/About',
			},
			{
				title: 'Projelerim',
				href: '/Project',
			},
			{
				title: 'Kullanılan Teknelojiler',
				href: '/Technology',
			},
			{
				title: 'İş Geçmisi',
				href: '/Work',
			},
			{
				title: 'Eğitim Geçmisi',
				href: '/Education',
			},
			{
				title: 'Gelen Mesajlar',
				href: '/Message',
			},
			{
				title: 'Karşılama Yazısı',
				href: '/Home',
			},
		],
	},
];

export default NAV_LINKS_CONFIG;
