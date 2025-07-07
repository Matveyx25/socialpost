import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useUpdateCart = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			 const token = localStorage.getItem('token');
			 if (!token) {
				 localStorage.setItem('cart', JSON.stringify(data));
				 queryClient.invalidateQueries(['cart'])
				 return
			 }
			 return profile.updateCart(data.map(el => ({durationId: el.format, channelId: el.id, count: el.count})));
		},
		onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
	})
}