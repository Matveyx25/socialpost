import React from "react";
import { Box } from "@mui/material";
import { Labeled, SelectField, TextField } from "react-admin";

export const ShowLegalEntity = () => {
  return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box sx={{ maxWidth: 500, sm: "flex" }}>
          <Labeled>
            <TextField source="inn" label="ИНН" />
          </Labeled>
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
          <Labeled>
            <TextField source="ogrn" label="ОГРН" />
          </Labeled>
          <Labeled>
            <TextField source="legalAddress" label="Юридический адрес" />
          </Labeled>
          <Labeled>
            <TextField
              source="correspondenceAddress"
              label="Адрес для корреспонденции"
            />
          </Labeled>
        </Box>
        <Box sx={{ maxWidth: 500 }}>
          <Labeled>
            <TextField
              source="bankDetails.checkingAccount"
              label="Расчетный счет"
            />
          </Labeled>
          <Labeled>
            <TextField source="bankDetails.bank" label="B" />
          </Labeled>
          <Labeled>
            <TextField source="bankDetails.bik" label="БИК" />
          </Labeled>
          <Labeled>
            <TextField
              source="bankDetails.correspondentAccount"
              label="Корреспондентский счет"
            />
          </Labeled>
        </Box>
      </Box>
    </>
  );
};
