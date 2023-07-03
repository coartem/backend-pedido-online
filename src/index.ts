import { PrismaClient } from "@prisma/client"
import dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    const { message } = req.body

    if (!message)
        return res.status(400).send({ message: "Message is required"})

    res.send({ message });
})

app.get("/snacks", (req: Request, res: Response) => {
    const { snack } = req.query

    if (!snack) return res.status(400).send({ error: "Snack is required" })

    const snacks = prisma.client.snack.findMany({
        where: {
            snack:{
                equals: snack as string,
            },
        },
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})