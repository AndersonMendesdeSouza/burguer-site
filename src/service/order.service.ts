import type { OrderRequestDto } from "../dtos/request/order-request.dto";
import type {
  OrderCreatedResponseDto,
  OrderResponseDto,
} from "../dtos/response/order-response.dto";
import { isAxiosError } from "axios";
import {
  getGuestOrderIds,
  getGuestOrderToken,
  removeGuestOrderToken,
  saveGuestOrderToken,
} from "../utils/guestOrderStorage";
import api from "./api";

export const OrderService = {
  create: async (payload: OrderRequestDto): Promise<OrderResponseDto> => {
    const response = await api.post<OrderCreatedResponseDto>("/orders", payload);
    if (response.data.guestToken) {
      saveGuestOrderToken(response.data.id, response.data.guestToken);
    }
    return response.data;
  },

  findAll: async (): Promise<OrderResponseDto[]> => {
    if (!localStorage.getItem("token")) {
      const orders = await Promise.all(
        getGuestOrderIds().map(async (id) => {
          try {
            return await OrderService.findById(id);
          } catch (error) {
            if (
              isAxiosError(error) &&
              (error.response?.status === 401 || error.response?.status === 404)
            ) {
              removeGuestOrderToken(id);
              return null;
            }
            throw error;
          }
        }),
      );

      return orders.filter((order) => order !== null);
    }

    const response = await api.get<OrderResponseDto[]>("/orders/find-all");
    return response.data;
  },

  findById: async (id: string): Promise<OrderResponseDto> => {
    const guestToken = getGuestOrderToken(id);
    const response = await api.get<OrderResponseDto>(`/orders/${id}`, {
      headers: guestToken ? { "X-Order-Token": guestToken } : undefined,
    });
    return response.data;
  },

  cancel: async (id: string): Promise<OrderResponseDto> => {
    const guestToken = getGuestOrderToken(id);
    const response = await api.patch<OrderResponseDto>(
      `/orders/${id}`,
      { status: "CANCELED" },
      { headers: guestToken ? { "X-Order-Token": guestToken } : undefined },
    );
    return response.data;
  },
};
