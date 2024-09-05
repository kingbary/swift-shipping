type Order = {
    trackingNumber: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    currentLocation: string;
    status: string;
    arrivalDate: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhoneNumber: string;
    receiverEmail: string;
  };

  type TrackingInputProps = {
    className?: string;
    setTrackingError: (error: boolean) => void;
    setOrder: (order: any) => void;
    inputValue: string;
    setInputValue: (code: string) => void;
    setTrackingCode: (code: string) => void;
};