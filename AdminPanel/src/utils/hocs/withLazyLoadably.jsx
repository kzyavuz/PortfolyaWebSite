import { Suspense } from 'react';
import Loader from '@/components/loader';

// eslint-disable-next-line react/function-component-definition
const Loadable = (Component) => (props) =>
	(
		<Suspense
			fallback={
				<Loader
					addSx={{
						mt: 5,
					}}
				/>
			}
		>
			<Component {...props} />
		</Suspense>
	);

/* function Loadable(Component) {
	return function Loadably(props) {
		return (
			<Suspense fallback={<Loader />}>
				<Component {...props} />
			</Suspense>
		);
	};
} */
export default Loadable;
