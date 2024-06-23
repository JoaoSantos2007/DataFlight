import app from './src/app.js';
import { HOST, PORT } from './src/utils/env.js';

app.listen(PORT, HOST, () => {
  console.log(`Server is working on http://${HOST}:${PORT}`);
});
