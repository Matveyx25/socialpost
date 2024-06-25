import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddPostRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id, data) => advertiser.createRequests(id, data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}