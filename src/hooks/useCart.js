import { useQuery } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useCart = () => {
const token = localStorage.getItem('token');

 return useQuery({
    queryKey: ['cart'], 
    queryFn: () => {
      if (!token) {
        const pendingCartUpdate = localStorage.getItem('cart');
        if (pendingCartUpdate) {
          return JSON.parse(pendingCartUpdate);
        }
        return [];
      }
			localStorage.removeItem('cart');
      return profile.getCart();
    },
    select: data => {
			if (!token) {
				return data
			}
			return data.data.map(el => ({id: el.channelId, count: el.count, price: el.price, format: el.format}))
		}
 })
}