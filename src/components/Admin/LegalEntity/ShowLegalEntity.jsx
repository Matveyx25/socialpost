import React from "react";
import { Box } from "@mui/material";
import { Labeled, SelectField, TextField } from "react-admin";

export const ShowLegalEntity = () => {
  return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box sx={{ maxWidth: 500, sm: "flex" }} ml={{ xs: 0, sm: '0.5em' }}>
					<Box flex={1}>
						<Labeled>
							<TextField source="inn" label="ИНН" />
						</Labeled>
					</Box>
          <Box flex={1}>
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
          <Box flex={1}>
						<Labeled>
							<TextField source="ogrn" label="ОГРН" />
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled>
							<TextField source="legalAddress" label="Юридический адрес" />
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled>
							<TextField
								source="correspondenceAddress"
								label="Адрес для корреспонденции"
							/>
						</Labeled>
					</Box>
        </Box>
        <Box sx={{ maxWidth: 500 }} ml={{ xs: 0, sm: '0.5em' }}>
          <Box flex={1}>
						<Labeled>
							<TextField
								source="bankDetails.checkingAccount"
								label="Расчетный счет"
							/>
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled>
							<TextField source="bankDetails.bank" label="Банк" />
						</Labeled>
					</Box>
          <Box flex={1}>
						<Labeled>
							<TextField source="bankDetails.bik" label="БИК" />
						</Labeled>
					</Box>
          <Box flex={1}>
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
