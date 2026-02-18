import { Card } from "@mui/material";
import { ChipField, FunctionField, Show, Labeled, List, ListBase, Title, Loading } from "react-admin";


const renderTags = (record) => {
	if (!record || record?.length <= 0) {
		return null; 
	}

	const tags = record;
	
	return tags?.map((tag, index) => (
				<ChipField key={index} record={{tag}} source="tag" sx={{ marginRight: index < tags?.length - 1 ? 1 : 0, marginBottom: 1  }}/>
		))
};

export const TagsShow = (props) => (
  <List {...props} exporter={false}>
		{/* <Labeled> */}
    	{/* <FunctionField label="Теги" source="." render={renderTags}/> */}
		{/* </Labeled> */}
		<ListBase  render={({ data, total, isPending }) => console.log(data, total, isPending) || (
			<Card>
							<Title title="Теги" />
							{isPending ? <Loading/> : 
								data?.map(((tag,index) => (
									<ChipField key={index} record={{tag}} source="tag" sx={{ marginRight: index < total - 1 ? 1 : 0, marginBottom: 1  }}/>
								)))}
					</Card>
			)} />
	 </List>
);