import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublisherDeclineRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => publisher.declineRequest(data),
		onSuccess: () => {
      queryClient.invalidateQueries(['publishers-requests'])
    }, 
	})
}