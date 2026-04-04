// store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [], // This will hold the products added by the user
      
      // 1. Add item to cart
      addToCart: (product, size, quantity = 1) => {
        const currentCart = get().cartItems;
        const existingItem = currentCart.find(
          (item) => item.id === product.id && item.size === size
        );

        if (existingItem) {
          // If item exists, just increase the quantity
          set({
            cartItems: currentCart.map((item) =>
              item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // If new item, add it to the array
          set({ cartItems: [...currentCart, { ...product, size, quantity }] });
        }
      },

      // 2. Remove item from cart
      removeFromCart: (productId, size) => {
        set({
          cartItems: get().cartItems.filter(
            (item) => !(item.id === productId && item.size === size)
          ),
        });
      },

      // 3. Clear the entire cart (used after successful payment)
      clearCart: () => set({ cartItems: [] }),

      // 4. Calculate Total Price
      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'lumora-cart', // This saves the cart in the browser's Local Storage!
    }
  )
);