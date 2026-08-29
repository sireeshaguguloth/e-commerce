import { createContext, useContext, useState } from "react";

const CartContext = createContext()

// ids restart at 1 in every data file, so a cart line is identified by
// its category + id + image together.
const keyOf = (item) => `${item.product}-${item.id}-${item.image}`

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        setCartItems((prev) => {
            const exists = prev.some((line) => keyOf(line) === keyOf(item))
            if (exists) {
                return prev.map((line) =>
                    keyOf(line) === keyOf(item)
                        ? { ...line, quantity: line.quantity + 1 }
                        : line
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const decreaseQuantity = (item) => {
        setCartItems((prev) =>
            prev
                .map((line) =>
                    keyOf(line) === keyOf(item)
                        ? { ...line, quantity: line.quantity - 1 }
                        : line
                )
                .filter((line) => line.quantity > 0)
        )
    }

    const removFromCart = (index) => {
        setCartItems(cartItems.filter((item, i) => i !== index))
    }

    const getQuantity = (item) => {
        const line = cartItems.find((entry) => keyOf(entry) === keyOf(item))
        return line ? line.quantity : 0
    }

    const totalQuantity = cartItems.reduce((sum, line) => sum + line.quantity, 0)

    const totalPrice = cartItems.reduce(
        (sum, line) => sum + Number(line.price) * line.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseQuantity,
                removFromCart,
                getQuantity,
                totalQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}
