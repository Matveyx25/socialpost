import { Box } from "@mui/material";
import React from "react";
import { Labeled, SelectField, TextField} from "react-admin";

export const ShowIE = () => {
	return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box sx={{ maxWidth: 500, sm: "flex" }}>
					<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField source="inn" label="ИНН" />
						</Labeled>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
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
					<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField source="ogrn" label="ОГРН" />
						</Labeled>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField source="address" label="Адрес" />
						</Labeled>
					</Box>
        </Box>
        <Box sx={{ maxWidth: 500 }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField
								source="bankDetails.checkingAccount"
								label="Расчетный счет"
							/>
						</Labeled>
					</Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField source="bankDetails.bank" label="B" />
						</Labeled>
					</Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
							<TextField source="bankDetails.bik" label="БИК" />
						</Labeled>
					</Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
						<Labeled>
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
