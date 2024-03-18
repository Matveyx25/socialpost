import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useUpdateChannel = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => publisher.updateChannel(data),
		onSuccess: () => {
      queryClient.invalidateQueries(['my-channels'])
    }, 
	})
}