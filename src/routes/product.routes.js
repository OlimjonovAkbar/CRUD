import { Router } from "express";
import {PrismaClient} from "@prisma/client"
const router = Router()
const prisma = new PrismaClient()

router.get('/', async(req,res, next) => {
    try {
        const task = await prisma.task.findMany({})
        res.json({ message:'All products', data:task })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req,res,next) => {
    try {
        const id = +req.params.id;
        const task = await prisma.task.findUnique({
            where:{
                id: id
            }
        })
        if (task == null){
            res.json({ message:"Task not found"})
            return
        }
        res.json({ message:"Task found", data:task})
    } catch (error) {
        next(error)
    }
})

router.post('/create',async(req,res,next)=>{
    try {
        const {name, desc} = req.body;

        const task = await prisma.task.create({
            data: {
                name: name,
                task: desc
            }
        })

        res.status(200).json({message: 'Product created', data: task})
        
    } catch (error) {
        next(error)
    }

})
router.delete('/delete/:id', async (req,res,next) => {
    try {
        const id = +req.params.id;

        const task = await prisma.task.findUnique({
            where:{
                id: id
            }
        })

        if(task != null){
            const deleteTask = await prisma.task.delete({
                where :{
                    id: id
                }
            })
    
            res.status(200).json({message: 'Task deleted', data: deleteTask})
            return;
        }

        res.json({ message:"Task not found"})
    } catch (error) {
        next(error)
    }
})

router.put('/update/:id', async (req,res,next) => {
    try {
        const id = +req.params.id;
        const {name, desc} = req.body;

        

        const task = await prisma.task.findUnique({
            where:{
                id: id
            }
        })

        if(task != null){
            const updateTask = await prisma.task.update({
                where :{
                    id: id
                },
                data:{ 
                    name,
                    task:desc
                }

            })
    
            res.status(200).json({message: 'Task updates', data: updateTask})
            return;
        }

        res.json({ message:"Task not found"})


        
    } catch (error) {
        next(error)
    }
})

export default router;
