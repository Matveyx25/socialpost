import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useDeclinePostRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: advertiser.declinePostRequest,
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}