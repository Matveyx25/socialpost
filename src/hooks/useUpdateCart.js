import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useUpdateCart = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => data && profile.updateCart(data.map(el => ({format: el.format, channelId: el.channelId, count: el.count}))),
		onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
	})
}