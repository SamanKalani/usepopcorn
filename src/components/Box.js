import { useState } from 'react'

export default function Box({ children, onCustomToggle, isCustomActive }) {
  const [isOpen, setIsOpen] = useState(true)

  function handleToggle() {
    // اگر در شرایط خاصی بودیم و تابع اختصاصی پاس داده شده بود
    if (onCustomToggle) {
      onCustomToggle()
    } else {
      // رفتار پیش‌فرض دسکتاپ
      setIsOpen((open) => !open)
    }
  }

  return (
    <div className="box">
      <button className="btn-toggle" onClick={handleToggle}>
        {isCustomActive || isOpen ? '–' : '+'}
      </button>
      {(isCustomActive || isOpen) && children}
    </div>
  )
}
