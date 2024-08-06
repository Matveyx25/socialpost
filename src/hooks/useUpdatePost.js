import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useUpdatePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.updatePost(data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    },
	}) 
}