import { Box } from "@mui/material";
import {
    SimpleForm,
    TextInput,
    Labeled,
		Create,
} from "react-admin";

export const DurationCreate = (props) => (
		<Create {...props} >
			<SimpleForm sx={{ maxWidth: 800 }}>
				<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput source="publishDays" label="Длительность публикации(дней)"/>
							</Labeled>
						</Box>
						<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
							<Labeled fullWidth>
								<TextInput source="retentionHours" label="Время удержания(часов)"/>
							</Labeled>
						</Box>
				</Box>
		</SimpleForm>
  </Create>
);
