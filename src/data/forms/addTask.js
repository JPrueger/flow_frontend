const fields = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Your Task Title",
    inputProps: {
      required: true,
      maxLength: 255,
    },
  },
  {
    name: "description",
    type: "text",
    label: "Description",
    placeholder: "Your Task Description",
    inputProps: {
      required: true,
      maxLength: 500,
    },
  },
  {
    name: "storypoints",
    type: "text",
    label: "Storypoints",
    placeholder: "Choose Storypiunts",
    inputProps: {
      required: true,
      maxLength: 255,
    },
  },
  {
    name: "status",
    type: "text",
    label: "Status",
    placeholder: "Choose Status",
    inputProps: {
      required: true,
      maxLength: 255,
    },
  },

];

export default fields;
