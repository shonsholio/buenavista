import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { router } from './routes/main.js'
import exp from 'constants';

const app = express();

// Para resolver __dirname correctamente si usas ES Modules (type: "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, './public')));

//MANEJO DE ERRORES
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

// app.listen(app.get('port'), () => {
//   console.log('Conectados')
// })
export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en local: http://localhost:${PORT}`);
  });
}
