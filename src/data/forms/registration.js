const fields = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Gib deinen Usernamen ein',
      inputProps: {
        required: true,
        maxLength: 255,
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-Mail Adresse',
      placeholder: 'email@example.at',
      inputProps: {
        required: true,
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Passwort',
      placeholder: 'Gib dein Passwort ein',
      inputProps: {
        required: true,
      },
    },
];
  
export default fields;
  