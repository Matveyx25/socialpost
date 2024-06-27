import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddPostRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.createRequests(data.id, data.data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}