import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useRemoveChannel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.removeChannel,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-channels'])
    }, 
	})
}