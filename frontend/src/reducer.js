const initialState = {
  hcp_name: "",
  interaction_type: "",
  date: "",
  time: "",
  attendees: "",
  sentiment: "",
  topics: "",
  materials_shared: "",
  samples_distributed: "",
  outcomes: "",
  follow_up: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        hcp_name: action.payload?.hcp_name || "",
        interaction_type: action.payload?.interaction_type || "",
        date: action.payload?.date || "",
        time: action.payload?.time || "",
        attendees: action.payload?.attendees || "",
        sentiment: action.payload?.sentiment || "",
        topics: action.payload?.topics || "",
        materials_shared: action.payload?.materials_shared || "",
        samples_distributed: action.payload?.samples_distributed || "",
        outcomes: action.payload?.outcomes || "",
        follow_up: action.payload?.follow_up || ""
      };

    default:
      return state;
  }
}

export default reducer;
