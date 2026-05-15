import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { PaymentApi, type PaymentStatusResult } from '@/features/payment/api'
import {
  clearPendingPayment,
  getPendingOrderId,
  getPendingPaymentId,
  setPendingPayment,
} from '../lib/paymentStorage'

const POLL_INTERVAL_MS = 2000
const POLL_MAX_ATTEMPTS = 6

const FINAL_FAILED_STATUSES = new Set(['canceled'])

async function fetchPaymentStatus(
  paymentId: string | null,
  orderId: string | null
): Promise<PaymentStatusResult | null> {
  if (paymentId) {
    return PaymentApi.getPaymentStatus(paymentId)
  }

  if (orderId) {
    return PaymentApi.getPaymentStatusByOrder(orderId)
  }

  return null
}

export default function Payment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPayment = async () => {
      const paymentIdFromQuery = searchParams.get('paymentId')
      const orderIdFromQuery = searchParams.get('orderId')
      const paymentId =
        paymentIdFromQuery ?? getPendingPaymentId()
      const orderId =
        orderIdFromQuery ?? getPendingOrderId()

      if (!paymentId && !orderId) {
        navigate('/failed')
        return
      }

      try {
        for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt += 1) {
          const paymentData = await fetchPaymentStatus(paymentId, orderId)

          if (!paymentData) {
            navigate('/failed')
            return
          }

          if (paymentData.payment_id) {
            setPendingPayment(
              paymentData.payment_id,
              orderIdFromQuery ?? orderId
            )
          }

          if (paymentData.status === 'succeeded') {
            clearPendingPayment()
            navigate('/success')
            return
          }

          if (FINAL_FAILED_STATUSES.has(paymentData.status)) {
            clearPendingPayment()
            navigate('/failed')
            return
          }

          const isLastAttempt = attempt === POLL_MAX_ATTEMPTS - 1
          if (!isLastAttempt) {
            await new Promise((resolve) => {
              setTimeout(resolve, POLL_INTERVAL_MS)
            })
          }
        }

        navigate('/failed')
      } catch (error) {
        console.error('[PAYMENT CHECK ERROR]', error)
        navigate('/failed')
      } finally {
        setLoading(false)
      }
    }

    void checkPayment()
  }, [navigate, searchParams])

  if (loading) {
    return <div>Проверяем статус оплаты...</div>
  }

  return null
}
