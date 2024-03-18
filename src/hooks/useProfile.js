import { useQuery } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useProfile = () => {
	return useQuery({
		queryKey: ['profile'], 
		queryFn: profile.me, 
		enabled: !!localStorage.getItem('token'),
		select: data => data.data
	})
}