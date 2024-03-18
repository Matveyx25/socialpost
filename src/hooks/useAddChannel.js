import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useAddChannel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.createChannel,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-channels'])
    }, 
	})
}