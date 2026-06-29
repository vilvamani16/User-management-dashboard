import {Routes, Route} from "react-router-dom"

import HomePage from "./components/Header"
import Dashboard from "./components/Dashboard"

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

export default App