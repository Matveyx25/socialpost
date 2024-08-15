import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useUpdateCampaign = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.updateCampaign(data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['campaign', data.id])
    },
	}) 
}