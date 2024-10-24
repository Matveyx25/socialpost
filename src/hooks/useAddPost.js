import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return advertiser.createPost(data)
		},
		onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
	})
}