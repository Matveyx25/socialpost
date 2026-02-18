import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { ChipField, FunctionField, Show, Labeled, List, ListBase, Title, Loading, useListContext } from "react-admin";


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
			{/* <Labeled>
			 <FunctionField label="Теги" source="." render={renderTags}/>
			</Labeled> */}
			<CardWithChips/>
	 </List>
);


const CardWithChips = () => {
  const { data, isLoading, total } = useListContext();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {data.map((record, index) => (
        <Chip label={record} variant="outlined"  sx={{ marginRight: index < total - 1 ? 1 : 0, marginBottom: 1  }}/>
      ))}
    </Stack>
  );
};