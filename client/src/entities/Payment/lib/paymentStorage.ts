export const PENDING_PAYMENT_ID_KEY = 'teriberka_pending_payment_id'
export const PENDING_ORDER_ID_KEY = 'teriberka_pending_order_id'

function writeToStorage(
  storage: Storage,
  paymentId: string,
  orderId?: string | null
): void {
  storage.setItem(PENDING_PAYMENT_ID_KEY, paymentId)

  if (orderId) {
    storage.setItem(PENDING_ORDER_ID_KEY, orderId)
  }
}

function writeToTargetWindow(
  targetWindow: Window,
  paymentId: string,
  orderId?: string | null
): void {
  try {
    writeToStorage(targetWindow.localStorage, paymentId, orderId)
    writeToStorage(targetWindow.sessionStorage, paymentId, orderId)
  } catch (error) {
    console.warn('[paymentStorage] cannot write to target window', error)
  }
}

export function setPendingPayment(
  paymentId: string,
  orderId?: string | null,
  targetWindow?: Window | null
): void {
  const normalizedPaymentId = paymentId.trim()

  if (!normalizedPaymentId) {
    return
  }

  try {
    writeToStorage(localStorage, normalizedPaymentId, orderId)
    writeToStorage(sessionStorage, normalizedPaymentId, orderId)
  } catch (error) {
    console.warn('[paymentStorage] cannot write to current window', error)
  }

  if (targetWindow && targetWindow !== window) {
    writeToTargetWindow(targetWindow, normalizedPaymentId, orderId)
  }
}

export function getPendingPaymentId(): string | null {
  return (
    localStorage.getItem(PENDING_PAYMENT_ID_KEY) ??
    sessionStorage.getItem(PENDING_PAYMENT_ID_KEY)
  )
}

export function getPendingOrderId(): string | null {
  return (
    localStorage.getItem(PENDING_ORDER_ID_KEY) ??
    sessionStorage.getItem(PENDING_ORDER_ID_KEY)
  )
}

export function clearPendingPayment(): void {
  localStorage.removeItem(PENDING_PAYMENT_ID_KEY)
  localStorage.removeItem(PENDING_ORDER_ID_KEY)
  sessionStorage.removeItem(PENDING_PAYMENT_ID_KEY)
  sessionStorage.removeItem(PENDING_ORDER_ID_KEY)
}

// Backward-compatible aliases
export const setPendingPaymentId = (
  paymentId: string,
  targetWindow?: Window | null
) => setPendingPayment(paymentId, null, targetWindow)

export const clearPendingPaymentId = clearPendingPayment
