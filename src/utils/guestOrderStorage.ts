const GUEST_ORDER_PREFIX = "mb_guest_order_";

export function saveGuestOrderToken(orderId: string, token: string) {
  sessionStorage.setItem(`${GUEST_ORDER_PREFIX}${orderId}`, token);
}

export function getGuestOrderToken(orderId: string) {
  return sessionStorage.getItem(`${GUEST_ORDER_PREFIX}${orderId}`);
}

export function removeGuestOrderToken(orderId: string) {
  sessionStorage.removeItem(`${GUEST_ORDER_PREFIX}${orderId}`);
}

export function getGuestOrderIds(): string[] {
  const orderIds: string[] = [];

  for (let index = 0; index < sessionStorage.length; index += 1) {
    const key = sessionStorage.key(index);
    if (key?.startsWith(GUEST_ORDER_PREFIX)) {
      orderIds.push(key.slice(GUEST_ORDER_PREFIX.length));
    }
  }

  return orderIds;
}
