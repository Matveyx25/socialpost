import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useStopCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.stopCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}