import { Box } from "@mui/material";
import React from "react";
import { DateField, Labeled, TextField } from "react-admin";

export const ShowSelfEmployed = () => {
	return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
			<Box sx={{ maxWidth: 800, sm: 'flex' }} mr={{ xs: 0, sm: '0.5em' }}>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled fullWidth>
									<TextField source="fullName" label="ФИО"/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled fullWidth>
									<TextField source="passportSeries" label="Серия паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled fullWidth>
									<TextField source="passportNumber" label="Номер паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled fullWidth>
									<DateField source="passportIssueDate" label="Выдан" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Labeled fullWidth>
							<DateField source="birthDate" label="Дата рождения" locales="ru-RU"  options={{dateStyle: 'short', format: 'dd.MM.yyyy'}}/>
						</Labeled>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
								<Labeled fullWidth>
									<TextField source="birthCity" label="Город рождения"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<Labeled fullWidth>
										<TextField source="address" label="Адрес"/>
									</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1}>
									<Labeled fullWidth>
										<TextField source="snils" label="СНИЛС"/>
									</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<Labeled fullWidth>
										<TextField source="inn" label="ИНН"/>
									</Labeled>
							</Box>
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
