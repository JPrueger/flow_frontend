const fields = [
  {
    name: "name",
    type: "text",
    label: "Username *",
    placeholder: "JaneDoe",
    inputProps: {
      required: true,
      maxLength: 255,
    },
  },
  {
    name: "email",
    type: "email",
    label: "E-Mail Adress *",
    placeholder: "email@example.at",
    inputProps: {
      required: true,
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password *",
    placeholder: "**********",
    inputProps: {
      required: true,
    },
  },
  {
    name: "characterName",
    type: "text",
    label: "Character Name *",
    placeholder: "Casper",
    inputProps: {
      required: true,
      maxLength: 255,
    },
  },
];

export default fields;
