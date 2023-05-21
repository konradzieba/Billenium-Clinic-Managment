export const userProfileInitialValues = {
  email: '',
  phoneNumber: '',
  city: '',
  street: '',
  zipCode: '',
};

type UserProfileReducerActionType = {
  type: 'email' | 'phoneNumber' | 'city' | 'street' | 'zipCode' | 'reset';
  payload?: string;
};

export const userProfileReducer = (
  state: typeof userProfileInitialValues,
  action: UserProfileReducerActionType
) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload || '' };
    case 'phoneNumber':
      return { ...state, phoneNumber: action.payload || '' };
    case 'city':
      return { ...state, city: action.payload || '' };
    case 'street':
      return { ...state, street: action.payload || '' };
    case 'zipCode':
      return { ...state, zipCode: action.payload || '' };
    case 'reset':
      return userProfileInitialValues;
    default:
      return state;
  }
};
