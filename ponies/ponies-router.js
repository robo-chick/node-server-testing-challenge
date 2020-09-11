const express = require("express")
const Ponies = require("./ponies-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await Ponies.find())
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
	try {
		const pony = await Ponies.findById(req.params.id)
		if (!pony) {
			return res.status(404).json({
				message: "Pony not found",
			})
		}
		res.json(pony)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
    try {
        const pony = await Ponies.create(req.body)
        res.status(201).json(pony)
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", (req, res, next) => {
    try {
        const pony = Ponies.remove(req.params.id)
        if(!pony) {
            return res.status(404).json({
                message: "Pony not found!"
            })
        }
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})


module.exports = router