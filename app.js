import express, { json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import e from 'express';

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => { 

    let users = [];

    if(req.query) {

        users = await prisma.user.findMany({

            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age

            }

        })

    } else{

        users = await prisma.user.findMany()

    }
   

    res.status(200).json(users);
});

app.post('/users', async (req, res) => { 

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body);
});




app.put('/users/:id', async (req, res) => { 

    await prisma.user.update({
        where: { 
            id: req.params.id 
        },

        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body);
});


app.delete('/users/:id', async (req, res) => { 

    await prisma.user.delete({
        where: { 
            id: req.params.id 
        },

    })
    res.status(201).json({msg: "User deleted"});
});
app.listen(3000);
