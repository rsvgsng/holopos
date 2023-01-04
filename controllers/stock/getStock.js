const ItemModel = require("../../models/ItemModel")


const getAllStock = async (req, res) => {
    try {
        const items = await ItemModel.find({})
        if (items.length < 1) return res.send({
            status: 404,
            message: "No items available"
        })
        return res.send(items)


    } catch (error) {
        res.status(500)
    }

}

const getStock = async (req, res) => {
    try {
        const items = await ItemModel.find({
            ItemQuantity: {
                $gt: 0,
            }
        })
        const outOfStock = await ItemModel.find({
            ItemQuantity: {
                $lte: 0,
            }
        })

        return res.send({
            TotalItemsInStock: items.length,
            TotalItemsOutOfStock: outOfStock.length,
            success: true,
            items: items
        })

    } catch (error) {
        return res.status(500)

    }
}
const getOutofStock = async (req, res) => {
    try {
        const items = await ItemModel.find({
            ItemQuantity: {
                $lte: 0,
            }
        })
        if (items.length < 1) return res.send({
            status: 404,
            message: "No items out of stock"
        })
        return res.send({
            TotalItemsOutOfStock: items.length,
            success: true,
            items: items
        })
    } catch (error) {
        res.status(500)
    }
}


const getSingleProduct = async (req, res) => {
    try {
        const items = await ItemModel.findById(req.params.id)
        if (!items) return res.send({
            success: false,
            status: 404,
            message: "Invalid Query or Item not found"
        })

        return res.send({
            success: true,
            item: items,
        })


    } catch (error) {
        res.status(404).send({
            status: 404,
            message: "Something went wrong"
        })
    }

}


const getProductByCategory = async (req, res) => {
    try {
        const items = await ItemModel.find({
            ItemCategory: req.params.category
        })
        if (items.length < 1) return res.send({
            status: 404,
            message: `No items available in '${req.params.category}' category`
        })

        return res.send({
            TotalItems: items.length,
            categoryName: req.params.category,
            items: items,
        })


    } catch (error) {
        res.status(404).send({
            status: 404,
            message: "Something went wrong"
        })
    }
}

const getSingleProductByCode = async (req, res) => {
    try {
        const items = await ItemModel.find({
            ItemCode: req.params.code
        })
        if (items.length < 1) return res.send({
            status: 404,
            message: `No items available with code '${req.params.code}'`
        })

        return res.send({
            TotalItems: items.length,
            items: items,
        })
    }
    catch (error) {
        res.status(404).send({
            status: 404,
            message: "Something went wrong"
        })
    }
}



module.exports = {
    getAllStock,
    getSingleProduct,
    getStock,
    getProductByCategory,
    getOutofStock,
    getSingleProductByCode


}