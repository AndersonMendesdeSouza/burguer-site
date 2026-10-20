import type { PaymentMethodEnum } from "../enums/payment-method.enum";
import type { OrderItem } from "../../types/order-item.type";
import type { AddressResponseDto } from "./address-response.dto";
import type { ChatResponseDto } from "./chat-response.dto";

type OrderHistory = {
  status: string;
  label: string;
  time?: string;
  createdAt: string;
};

export interface OrderResponseDto {
  id: string;
  mesaId?: string;
  userId: string | null;
  addressId?: string;
  chatId?: string;
  address?: AddressResponseDto;
  chat?: ChatResponseDto;
  code: number;
  status: string;
  paymentMethod: PaymentMethodEnum;
  customerName: string;
  customerPhone: string;
  subtotal: string;
  deliveryFee: string;
  discount: string;
  total: string;
  items: OrderItem[];
  history: OrderHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreatedResponseDto extends OrderResponseDto {
  guestToken?: string;
}
