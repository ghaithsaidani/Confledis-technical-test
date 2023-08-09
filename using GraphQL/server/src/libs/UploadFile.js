import  { createWriteStream } from "fs";
import { parse, join } from "path";

export const readFile = async (file) => {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    let { ext, name } = parse(filename);
    name = `single${Math.floor(Math.random() * 10000 + 1)}`;
    let url = join(__dirname, `../../../client/public/uploads/${name}-${Date.now()}${ext}`);
    console.log({url})
    const imageStream = createWriteStream(url);
    await stream.pipe(imageStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    url = `${baseUrl}:${port}${url.split("uploads")[1]}`;
    return url;
};