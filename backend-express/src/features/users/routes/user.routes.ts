import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    res.status(200).json({
        message: 'User routes are not working '
    })

})


export default router