import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useStopAllCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.stopAllCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['campaign', data.id])
    }, 
	})
}