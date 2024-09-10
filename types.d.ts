type OrderStatus =
  | "Label Created"
  | "Shipped"
  | "Attention Required"
  | "Out For Delivery"
  | "Delivered";

type Order = {
  id: string;
  trackingNumber: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  currentLocation: string;
  status: OrderStatus;
  arrivalDate: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhoneNumber: string;
  receiverEmail: string;
};

type TrackingInputProps = {
  className: string;
  setTrackingError: (value: boolean) => void;
  setOrder: (order: Order | null) => void;
  setTrackingCode: (code: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  setIsTracking: (value: boolean) => void;
};

type EditOrderProps = {
  selectedOrder: Order | null;
  setSelectedOrder: (value: Order | null) => void;
}
