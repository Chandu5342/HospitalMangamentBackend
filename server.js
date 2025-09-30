import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
