import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './home'
import Detail from './detail'
import Login from './login'

const App: React.FC = () => {
    const isUser: boolean = localStorage.getItem('isUser') === 'true'

    return (
        <Router>
            <Routes>
                <Route path='/' element={isUser ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={!isUser ? <Login /> : <Navigate to='/' />} />
                <Route
                    path='/detail/:videoId'
                    element={isUser ? <Detail /> : <Navigate to='/login' />}
                />
            </Routes>
        </Router>
    )
}

export default App
