import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
const Signin = withLazyLoadably(lazy(() => import('@/pages/Login/SignIn')));
const Signup = withLazyLoadably(lazy(() => import('@/pages/Login/SignUp')));
// hakkımızda sayfalarının importu
const AboutPage = withLazyLoadably(lazy(() => import('@/pages/About')));
const AddAbout = withLazyLoadably(lazy(() => import('@/pages/About/AddAbout')));
const UpdateAbout = withLazyLoadably(lazy(() => import('@/pages/About/UpdateAbout')));
// project sayfalarının importu
const ProjectPage = withLazyLoadably(lazy(() => import('@/pages/Project')));
const UpdateProject = withLazyLoadably(lazy(() => import('@/pages/Project/UpdateProject')));
const AddProject = withLazyLoadably(lazy(() => import('@/pages/Project/AddProject')));
// techneloji sayfalarının importu
const TechelojiPage = withLazyLoadably(lazy(() => import('@/pages/Technology')));
const AddTechnology = withLazyLoadably(lazy(() => import('@/pages/Technology/AddTechnology')));
const UpdateTechnology = withLazyLoadably(lazy(() => import('@/pages/Technology/UpdateTechnology')));

// iş sayfalarının importu
const WorkPage = withLazyLoadably(lazy(() => import('@/pages/Work')));
const AddWork = withLazyLoadably(lazy(() => import('@/pages/Work/AddWork')));
const UpdateWork = withLazyLoadably(lazy(() => import('@/pages/Work/UpdateWork')));

// Eğitim Sayfaları importu
const EducationPage = withLazyLoadably(lazy(() => import('@/pages/Education')));
const AddEducation = withLazyLoadably(lazy(() => import('@/pages/Education/AddEducation')));
const UpdateEducation = withLazyLoadably(lazy(() => import('@/pages/Education/UpdateEducation')));

// Mesaj Sayfaları importu
const MessagePage = withLazyLoadably(lazy(() => import('@/pages/Message')));
const DetailsMessage = withLazyLoadably(lazy(() => import('@/pages/Message/DetailsMessage')));

// Yeni gelen Mesaj Sayfaları importu
const NewMessagePage = withLazyLoadably(lazy(() => import('@/pages/NewMessage')));
const NewDetailsMessage = withLazyLoadably(lazy(() => import('@/pages/NewMessage/DetailsMessage')));

// Kullanıcı Sayfaları
const UsersPage = withLazyLoadably(lazy(() => import('@/pages/Users')));
const AuthRoute = withLazyLoadably(lazy(() => import('./AuthRoute')));

// Karsılama Sayfası
const HomePage = withLazyLoadably(lazy(() => import('@/pages/Home')));
const UpdateHome = withLazyLoadably(lazy(() => import('@/pages/Home/UpdateHome')));
const AddHome = withLazyLoadably(lazy(() => import('@/pages/Home/AddHome')));

function Router() {
	return (
		<BrowserRouter>
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MinimalLayout />}>
						<Route index element={<Signin />} />
					</Route>
					<Route element={<AuthRoute />}>
						<Route path="/" element={<MinimalLayout />}>
							<Route path="/SignUp" element={<Signup />} />
						</Route>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<SamplePage />} />
							<Route path="samplePage" element={<SamplePage />} />
							<Route path="About/">
								<Route index element={<AboutPage />} />
								<Route path="AddAbout" element={<AddAbout />} />
								<Route path="UpdateAbout" element={<UpdateAbout />} />
							</Route>
							<Route path="Project/">
								<Route index element={<ProjectPage />} />
								<Route path="AddProject" element={<AddProject />} />
								<Route path="UpdateProject" element={<UpdateProject />} />
							</Route>
							<Route path="Technology/">
								<Route index element={<TechelojiPage />} />
								<Route path="AddTechnology" element={<AddTechnology />} />
								<Route path="UpdateTechnology" element={<UpdateTechnology />} />
							</Route>
							<Route path="Work/">
								<Route index element={<WorkPage />} />
								<Route path="AddWork" element={<AddWork />} />
								<Route path="UpdateWork" element={<UpdateWork />} />
							</Route>

							<Route path="Education/">
								<Route index element={<EducationPage />} />
								<Route path="AddEducation" element={<AddEducation />} />
								<Route path="UpdateEducation" element={<UpdateEducation />} />
							</Route>

							<Route path="Message/">
								<Route index element={<MessagePage />} />
								<Route path="DetailsMessage" element={<DetailsMessage />} />
							</Route>

							<Route path="NewMessage/">
								<Route index element={<NewMessagePage />} />
								<Route path="DetailsMessage" element={<NewDetailsMessage />} />
							</Route>

							<Route path="Users/">
								<Route index element={<UsersPage />} />
							</Route>

							<Route path="Home/">
								<Route index element={<HomePage />} />
								<Route path="UpdateHome" element={<UpdateHome />} />
								<Route path="AddHome" element={<AddHome />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
