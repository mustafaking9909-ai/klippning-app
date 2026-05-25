export const SERVICES = [
  {
    id: "1",
    name: "Herr Klippning",
    price: 150,
    duration: 30,
  },
  {
    id: "2",
    name: "Line Up",
    price: 100,
    duration: 15,
  },
  {
    id: "3",
    name: "Skägg",
    price: 50,
    duration: 15,
    addon: true,
  },
];

export type TimeSlot = {
  time: string;
  available: boolean;
};