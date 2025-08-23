import Product from "../models/product.model.js";

export const addToCart = async(req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItem.find(item => item.id === productId);
        if(existingItem) {
            existingItem.quantity += 1;
        }
        else{
            user.cartItem.push(productId)
        }

        await user.save();
        res.json(user.cartItems)
    } catch (error) {
        onsole.error("Error in addToCart:", error.message);
    res.status(500).json({ message: "Failed to add product to cart" });
    }
}

export const removeAllFromCart = async(req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }
        else{
            user.cartItems = user.cartItems.filter((item) => item.id !== productId)
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
    console.error("Error in removeAllFromCart:", error.message);
    res.status(500).json({ message: "Failed to remove products from cart" });
    }
}

export const updateQuantity = async(req, res) => {
    try {
        const {id: productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartItem.filter((item) => item.id !== productId);

        if(existingItem){
            if(quantity === 0){
                user.cartItem = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }
            else{
                res.status(404).json({message: "Product not found"})
            }
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const getCartProducts = async(req, res) => {
    try {
        const products = await Product.find({_id: {$in: req.user.cartItems}});
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
            return {...product.toJSON(), quantity: item.quantity}
        })
        res.json(cartItems)
        
    } catch (error) {
    console.error("Error in getCartProducts:", error.message);
    res.status(500).json({ message: "Failed to fetch cart products" });
    }
}