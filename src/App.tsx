import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useProvideCustomTheme } from './hooks/useCustomTheme';

const App = () => {
    const theme = useProvideCustomTheme();
    const isAuth = Boolean(useAppSelector(state => state.token));

    return (<div className='app'>
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
                    <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
                </Routes>
            </ThemeProvider>
        </HashRouter>
    </div>);
};

export default App;
