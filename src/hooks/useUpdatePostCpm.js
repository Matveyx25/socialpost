import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useUpdatePostCpm = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.updatePostCpm(data),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    },
	}) 
}