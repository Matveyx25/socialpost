import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useUpdatePostContent = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.updatePostContent(data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    },
	}) 
}