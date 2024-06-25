import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddModeratePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.createModeration(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}