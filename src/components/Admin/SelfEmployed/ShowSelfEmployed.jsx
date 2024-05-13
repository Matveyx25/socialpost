import { Box } from "@mui/material";
import React from "react";
import { DateField, Labeled, TextField } from "react-admin";

export const ShowSelfEmployed = () => {
	return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
			<Box sx={{ maxWidth: 500, sm: 'flex' }} mr={{ xs: 0, sm: '0.5em' }}>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled>
									<TextField source="fullName" label="ФИО"/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled>
									<TextField source="passportSeries" label="Серия паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<TextField source="passportNumber" label="Номер паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<DateField source="passportIssueDate" label="Выдан" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Labeled>
							<DateField source="birthDate" label="Дата рождения" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
						</Labeled>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled>
									<TextField source="birthCity" label="Город рождения"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<Labeled>
										<TextField source="address" label="Адрес"/>
									</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<Labeled>
										<TextField source="snils" label="СНИЛС"/>
									</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<Labeled>
										<TextField source="inn" label="ИНН"/>
									</Labeled>
							</Box>
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
