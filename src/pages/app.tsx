import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './home'
import Detail from './detail'
import Login from './login'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/detail/:videoId' element={<Detail />} />
            </Routes>
        </Router>
    )
}

export default App
