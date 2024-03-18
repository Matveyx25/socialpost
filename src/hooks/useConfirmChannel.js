import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useConfirmChannel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.confirmChannel,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-channels'])
    }, 
	})
}