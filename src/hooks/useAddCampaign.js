import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddCampaign = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: advertiser.createCampaign,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-campaign'])
    }, 
	})
}