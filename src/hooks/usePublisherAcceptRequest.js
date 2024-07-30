import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublisherAcceptRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => publisher.acceptRequest(data),
		onSuccess: () => {
      queryClient.invalidateQueries(['publishers-requests'])
    }, 
	})
}