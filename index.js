import express from 'express';
const app = express();
// Корневой маршрут
app.get('/', (req, res) => {
    res.json({ "hi": "bye" });
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

app.listen(4321, () => {
    console.log('Server running on http://localhost:4321');
});