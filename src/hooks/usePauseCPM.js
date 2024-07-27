import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const usePauseCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.pauseCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}