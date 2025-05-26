import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/header'
import Home from './home'
import Detail from './detail'
import Login from './login'

const AppRoutes: React.FC = () => {
    const isUser: boolean = localStorage.getItem('isUser') === 'true'
    const location = useLocation()
    const hideHeader: boolean = location.pathname === '/login'

    return (
        <>
            {!hideHeader && <Header />}
            <Routes>
                <Route path='/' element={isUser ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={!isUser ? <Login /> : <Navigate to='/' />} />
                <Route
                    path='/detail/:videoId'
                    element={isUser ? <Detail /> : <Navigate to='/login' />}
                />
            </Routes>
        </>
    )
}

const App: React.FC = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    )
}

export default App
