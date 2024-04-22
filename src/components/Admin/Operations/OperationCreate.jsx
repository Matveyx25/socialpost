import * as React from "react";
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const OperationCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="userId"
        validate={[required()]}
        fullWidth
        label="ID пользователя"
      />
      <SelectInput
        label="Тип"
        source="type"
        choices={[
          { id: "INCOME", name: "Поступление" },
          { id: "WITHDRAWAL_SELF_EMPLOYED", name: "Вывод у самозанятого" },
          { id: "WITHDRAWAL_IE", name: "Вывод у ИП" },
          { id: "WITHDRAWAL_LEGAL_ENTITY", name: "Вывод у ЮЛ" },
          { id: "WITHDRAWAL_CRYPTO_WALLET", name: "Вывод с криптокошелька" },
        ]}
      />
      <TextInput source="amount" label="Сумма" validate={[required()]}/>
    </SimpleForm>
  </Create>
);
