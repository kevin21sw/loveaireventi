export type Destination = "ANTALYA" | "BODRUM" | "FETHIYE" | "CRETE";

export type HotelDTO = {
  id: string;
  name: string;
  destination: Destination;
  driveUrl: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type HotelFormData = {
  id: string;
  name: string;
  destination: Destination;
  driveUrl: string;
  coverImageUrl: string;
};
