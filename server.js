import express from 'express';
const app = express();

// Middleware для CORS (если нужно обращаться с других доменов)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Корневой маршрут
app.get('/', (req, res) => {
    res.json({ 
        "message": "Express API работает!",
        "endpoints": [
            "GET /",
            "GET /login",
            "GET /deg/:x1/:x2"
        ]
    });
});

// Маршрут /login 
app.get('/login', (req, res) => {
    res.send('semyonkombarov'); 
});

// Маршрут /deg/{x1}/{x2} - возводит x1 в степень x2
app.get('/deg/:x1/:x2', (req, res) => {
    try {
        const x1 = parseFloat(req.params.x1);
        const x2 = parseFloat(req.params.x2);
        
        if (isNaN(x1) || isNaN(x2)) {
            return res.status(400).send('Ошибка: параметры должны быть числами');
        }
        
        const result = Math.pow(x1, x2);
        res.send(result.toString());
    } catch (error) {
        res.status(500).send('Ошибка вычисления');
    }
});

// Обработка 404
app.use((req, res) => {
    res.status(404).send('Маршрут не найден');
});

// Используем порт из переменной окружения или 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
