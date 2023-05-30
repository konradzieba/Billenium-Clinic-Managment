// tutaj dodać typy, które będą używane w wiecej niz jednym komponencie
// !!! nie dodawać Props typów!!! one są w komponentach

export type DoctorListType = {
  doctorId: number;
  description: string;
  specialization:
    | `OPHTHALMOLOGIST`
    | `INTERNIST`
    | `GASTROENTEROLOGIST`
    | `PULMONOLOGIST`;
  photo: string;
  firstName: string;
  lastName: string;
};

type PatientUserInfoType = {
  userInfoId: number;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  pesel: string;
  password: string;
  phoneNumber: string;
  userRole: string;
  createdAt: string;
  modifiedAt: string;
};

type AddressResponseType = {
  addressId: number;
  city: string;
  street: string;
  zipCode: string;
};

export type UserProfileInfoType = {
  patientId: number;
  allergies: string;
  medicines: string;
  patientUserInfo: Omit<PatientUserInfoType, 'password'>;
  addressResponseDTO: AddressResponseType;
};

export type PatchUserInfoType = {
  patientId: number;
  userInfoUpdateDTO: Omit<
    PatientUserInfoType,
    | 'userRole'
    | 'createdAt'
    | 'modifiedAt'
    | 'pesel'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'birthdate'
  >;
  allergies: string;
  medicines: string;
  addressUpdateDTO: AddressResponseType;
};

export type AppointmentResponseType = {
  appointmentId: number;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  patientSymptoms: string;
  medicinesTaken: string;
  appointmentStatus: string;
  doctorRecommendations: string;
  createdAt: string;
  modifiedAt: string;
};
