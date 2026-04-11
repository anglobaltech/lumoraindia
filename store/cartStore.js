import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [], 
      
      // 1. Add item to cart (Now includes 'pack' configuration)
      addToCart: (product, size, pack = 1, quantity = 1) => {
        const currentCart = get().cartItems;
        
        // Find if this EXACT configuration (same product, same size, same pack) exists
        const existingItem = currentCart.find(
          (item) => item.id === product.id && item.size === size && item.pack === pack
        );

        if (existingItem) {
          set({
            cartItems: currentCart.map((item) =>
              item.id === product.id && item.size === size && item.pack === pack
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cartItems: [...currentCart, { ...product, size, pack, quantity }] });
        }
      },

      // 2. Remove item from cart
      removeFromCart: (productId, size, pack) => {
        set({
          cartItems: get().cartItems.filter(
            (item) => !(item.id === productId && item.size === size && item.pack === pack)
          ),
        });
      },

      // 3. Update Quantity (+ and - buttons in cart)
      updateQuantity: (productId, size, pack, delta) => {
        const currentCart = get().cartItems;
        const existingItem = currentCart.find(
          (item) => item.id === productId && item.size === size && item.pack === pack
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + delta;
          if (newQuantity <= 0) {
            // If quantity goes to 0, remove it entirely
            get().removeFromCart(productId, size, pack);
          } else {
            set({
              cartItems: currentCart.map((item) =>
                item.id === productId && item.size === size && item.pack === pack
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            });
          }
        }
      },

      // 4. Clear the entire cart (After successful checkout)
      clearCart: () => set({ cartItems: [] }),

      // 5. Calculate Total Price
      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'lumora-cart', 
    }
  )
);