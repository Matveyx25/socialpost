import { Box } from "@mui/material";
import React from "react";
import { DateField, Labeled, TextField } from "react-admin";

export const ShowSelfEmployed = () => {
	return (
    <>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
			<Box sx={{ maxWidth: 500, sm: 'flex' }}>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<TextField source="fullName" label="ФИО"/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<TextField source="passportSeries" label="Серия паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<TextField source="passportNumber" label="Номер паспорта"/>
								</Labeled>
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<DateField source="passportIssueDate" label="Выдан" transform={value =>
									(new Date(value)).toLocaleString('ru-RU', {})
									}/>
								</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
						<Labeled>
							<DateField source="birthDate" label="Дата рождения" transform={value =>
									(new Date(value)).toLocaleString('ru-RU', {})
									}/>
						</Labeled>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
								<Labeled>
									<TextField source="birthCity" label="Город рождения"/>
								</Labeled>
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<Labeled>
										<TextField source="address" label="Адрес"/>
									</Labeled>
							</Box>
					</Box>
					<Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
							<Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
									<Labeled>
										<TextField source="snils" label="СНИЛС"/>
									</Labeled>
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
									<Labeled>
										<TextField source="inn" label="ИНН"/>
									</Labeled>
							</Box>
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
