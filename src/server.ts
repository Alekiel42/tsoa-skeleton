//todo NODE_ENV à comprendre dans build MM dans packagejson

import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);