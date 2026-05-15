import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { axiosInstance } from '@/shared/lib/axiosInstance'
import type { Payment } from '../model/model'

export default function Payment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const paymentId = searchParams.get('paymentId')
  console.log(paymentId);
  

  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPayment = async () => {
      try {
        if (!paymentId) {
          navigate('/failed')
          return
        }

        const response = await axiosInstance.get<Payment>(
          `/api/payments/status/${paymentId}`
        )

        const paymentData = response.data

        setPayment(paymentData)

        if (paymentData.status === 'succeeded') {
          navigate('/success')
          return
        }

        if (paymentData.status === 'canceled') {
          navigate('/failed')
          return
        }

      } catch (error) {
        console.error('[PAYMENT CHECK ERROR]', error)

        navigate('/failed')

      } finally {
        setLoading(false)
      }
    }

    checkPayment()
  }, [navigate, paymentId])

  if (loading) {
    return <div>Проверяем статус оплаты...</div>
  }

  return (
    <div>
      <h1>Платеж</h1>

      <pre>
        {JSON.stringify(payment, null, 2)}
      </pre>
    </div>
  )
}