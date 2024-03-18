import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useUpdateProfile = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: profile.updateProfile,
		onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
	})
}