import { Rodape } from 'Componentes/Rodape';
import Titulo from 'Componentes/Titulo';
import Catalogos from 'Paginas/Catalogos';
import Inicio from 'Paginas/Inicio';
import Produto from 'Paginas/Produto';
import Sacola from 'Paginas/Sacola';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function AppRotas() {
    return (
        <main>
            <Router>
                <Titulo />
                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/catalogo' element={<Catalogos />} />
                    <Route path='/sacola' element={<Sacola />} />
                    <Route path='/produto/:id' element={<Produto/>}/>
                    <Route path='/sobrenos' element={<SobreNos/>}/>
                </Routes>
                <Rodape/>
            </Router>
        </main>
    )
}
