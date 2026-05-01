import { create } from 'zustand'

export const useWishlistStore = create((set, get) => ({
  items: [],

  // Add item to wishlist
  addItem: (product) => {
    const items = get().items
    const exists = items.find((item) => item.id === product.id)

    if (!exists) {
      set({
        items: [...items, product],
      })
    }
  },

  // Remove item from wishlist
  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.id !== productId),
    })
  },

  // Toggle item in wishlist
  toggleItem: (product) => {
    const items = get().items
    const exists = items.find((item) => item.id === product.id)

    if (exists) {
      get().removeItem(product.id)
    } else {
      get().addItem(product)
    }
  },

  // Check if item is in wishlist
  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId)
  },

  // Clear wishlist
  clearWishlist: () => {
    set({ items: [] })
  },
}))
