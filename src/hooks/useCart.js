import { useQuery } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useCart = () => {
	return useQuery({
		queryKey: ['cart'], 
		enabled: !!localStorage.getItem('token'),
		queryFn: profile.getCart, 
		select: data => data.data
	})
}