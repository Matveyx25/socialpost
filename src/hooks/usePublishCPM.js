import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublishCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => publisher.publishCPM(data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['publishers-cpm-channels', data.id])
    }, 
	})
}