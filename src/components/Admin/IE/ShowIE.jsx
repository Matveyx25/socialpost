import { Box } from "@mui/material";
import React from "react";
import { Labeled, SelectField, TextField} from "react-admin";

export const ShowIE = () => {
	return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box sx={{ maxWidth: 800, sm: "flex" }} mr={{ xs: 0, sm: '0.5em' }}>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="inn" label="ИНН" />
						</Labeled>
					</Box>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="vatRate" label="НДС" />
						</Labeled>
					</Box>
					<Box flex={1}>
						<Labeled fullWidth>
							<SelectField
								source="taxSystem"
								choices={[
									{ id: "OSN", name: "ОСН" },
									{ id: "USN", name: "УСН" },
								]}
								label="Система налогообложения"
							/>
						</Labeled>
					</Box>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="ogrn" label="ОГРН" />
						</Labeled>
					</Box>
					<Box flex={1}>
						<Labeled fullWidth>
							<TextField source="address" label="Адрес" />
						</Labeled>
					</Box>
        </Box>
        <Box sx={{ maxWidth: 800 }} ml={{ xs: 0, sm: '0.5em' }}>
          <Box flex={1}>
						<Labeled fullWidth>
							<TextField
								source="bankDetails.checkingAccount"
								label="Расчетный счет"
							/>
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled fullWidth>
							<TextField source="bankDetails.bank" label="Банк" />
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled fullWidth>
							<TextField source="bankDetails.bik" label="БИК" />
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled fullWidth>
							<TextField
								source="bankDetails.correspondentAccount"
								label="Корреспондентский счет"
							/>
						</Labeled>
					</Box>
        </Box>
      </Box>
    </>
  );
};
