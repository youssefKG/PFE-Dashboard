import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { localStorageService } from '../services/localStorageService';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [count, setCount] = useState(0);

  // Initialize wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorageService.getWishlist();
    setWishlist(storedWishlist);
    setCount(storedWishlist.length);
  }, []);

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    localStorageService.addToWishlist(product);
    const updatedWishlist = localStorageService.getWishlist();
    setWishlist(updatedWishlist);
    setCount(updatedWishlist.length);
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    localStorageService.removeFromWishlist(productId);
    const updatedWishlist = localStorageService.getWishlist();
    setWishlist(updatedWishlist);
    setCount(updatedWishlist.length);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return localStorageService.isInWishlist(productId);
  };

  // Clear wishlist
  const clearWishlist = () => {
    localStorageService.clearWishlist();
    setWishlist([]);
    setCount(0);
  };

  return {
    wishlist,
    count,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };
}; 