import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"
import { useProfile } from "./useProfile"

export const usePublishersRequests = (params) => {
	const {data: profile} = useProfile()

	return useQuery({
		queryKey: ['publishers-requests', params], 
		queryFn: () => publisher.getPublishersRequests(params), 
		enabled: profile.roles.includes('PUBLISHER'),
		select: data => ({ data: data.data, headers: data.headers }),
	})
}