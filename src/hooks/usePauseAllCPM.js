import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const usePauseAllCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.pauseAllCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['campaign', data.id])
    }, 
	})
}