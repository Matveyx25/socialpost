import { ChipField, FunctionField, Show, Labeled } from "react-admin";


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
  <Show {...props} exporter={false}>
		<Labeled>
    	<FunctionField label="Теги" source="." render={renderTags}/>
		</Labeled>
  </Show>
);