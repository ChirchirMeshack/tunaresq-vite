import { useState } from "react"

// Custom SVG Icons
const MobileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
)

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="18,15 12,9 6,15" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" />
    <polyline points="12,19 5,12 12,5" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
    <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const PaymentDetails = ({ onBack = () => {}, onContinue = () => {}, onPaymentChange = () => {}, className = "" }) => {
  const [activeTab, setActiveTab] = useState("mobile")
  const [selectedPayment, setSelectedPayment] = useState("mpesa")
  const [selectedCardPayment, setSelectedCardPayment] = useState("mastercard")
  const [formData, setFormData] = useState<Record<string, string>>({})

  const [expandedMethods, setExpandedMethods] = useState<Record<string, boolean>>({
    "mpesa": true,
    "airtel": false,
    "equitel": false,
    "airtel-money": false,
  })

  const toggleMethodExpansion = (methodId: string) => {
    setExpandedMethods((prev) => ({
      ...prev,
      [methodId]: !prev[methodId],
    }))
  }

  const [expandedCardMethods, setExpandedCardMethods] = useState<{ mastercard: boolean; visa: boolean }>({
    mastercard: true,
    visa: false,
  })


  type ExpandedCardMethods = {
    mastercard: boolean
    visa: boolean
  }

  const toggleCardMethodExpansion = (methodId: keyof ExpandedCardMethods) => {
    setExpandedCardMethods((prev) => ({
      ...prev,
      [methodId]: !prev[methodId],
    }))
  }


  const handlePaymentSelection = (paymentId: string, type: "mobile" | "card" = "mobile"): void => {
    if (type === "mobile") {
      setSelectedPayment(paymentId)
    } else {
      setSelectedCardPayment(paymentId)
    }
    onPaymentChange()
  }

  interface FormData {
    [key: string]: string
  }

  const handleInputChange = (field: string, value: string) => {
    const newFormData: FormData = { ...formData, [field]: value }
    setFormData(newFormData)
  }

  const handleContinue = () => {
    onContinue()
  }

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa Safaricom",
      description: "Receive funds directly to your M-pesa phone number",
      icon: <MobileIcon />,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      placeholder: "Example: +7XX XXX XXX",
      fields: ["Enter your M-pesa phone number"],
    },
    {
      id: "airtel",
      name: "Airtel",
      description: "Receive funds directly to your Airtel number",
      icon: <ShoppingCartIcon />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      placeholder: "Example: 1234567",
      fields: ["Enter the M-pesa Airtel number"],
    },
    {
      id: "equitel",
      name: "Equitel",
      description: "Receive funds directly to your Equitel number",
      icon: <DocumentIcon />,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      placeholder1: "Example: +254123",
      placeholder2: "Enter your account number",
      fields: ["Enter the business number", "Enter the account number"],
    },
    {
      id: "airtel-money",
      name: "Airtel Money",
      description: "Receive funds directly to your Airtel Money account",
      icon: <CreditCardIcon />,
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
      placeholder: "Example: +7XX XXX XXX",
      fields: ["Enter the Airtel Mobile number"],
    },
  ]

  const cardPaymentMethods = [
    {
      id: "mastercard",
      name: "Mastercard",
      description: "Receive funds directly to your Mastercard account",
      icon: <CreditCardIcon />,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      fields: ["Card holder name", "Enter your card number"],
      placeholders: ["XXXX XXXX XXXX XXXX", "XXXX XXXX XXXX XXXX"],
    },
    {
      id: "visa",
      name: "Visa",
      description: "Receive funds directly to your Visa account",
      icon: <CreditCardIcon />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      fields: ["Card holder name", "Enter your card number"],
      placeholders: ["XXXX XXXX XXXX XXXX", "XXXX XXXX XXXX XXXX"],
    },
  ]

  return (
    <div className={`w-full max-w-2xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen ${className}`}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Payment details</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Select your preferred payment option. The funds will be deposited in the option you select
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 sm:mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("mobile")}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
            activeTab === "mobile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5">
            <MobileIcon />
          </div>
          <span className="hidden xs:inline sm:inline">Mobile Money</span>
          <span className="xs:hidden sm:hidden">Mobile</span>
        </button>
        <button
          onClick={() => setActiveTab("card")}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
            activeTab === "card" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5">
            <CreditCardIcon />
          </div>
          <span className="hidden xs:inline sm:inline">Card Payments</span>
          <span className="xs:hidden sm:hidden">Cards</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === "mobile" && (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border-2 rounded-xl transition-all ${
                  selectedPayment === method.id ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"
                }`}
              >
                {/* Payment Method Header */}
                <div onClick={() => toggleMethodExpansion(method.id)} className="p-3 sm:p-4 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      {/* Radio Button */}
                      <div className="relative mt-1 flex-shrink-0">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={() => handlePaymentSelection(method.id, "mobile")}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-2 border-gray-300 focus:ring-green-500 focus:ring-2 focus:ring-offset-0"
                        />
                      </div>

                      {/* Icon and Content */}
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div
                          className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg border border-gray-100 ${method.iconBg}`}
                        >
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 ${method.iconColor}`}>{method.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{method.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{method.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Chevron Icon */}
                    <div className="text-gray-600 ml-2 sm:ml-4 flex-shrink-0">
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {expandedMethods[method.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Fields - Only show when expanded */}
                {expandedMethods[method.id] && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                    {method.fields.map((fieldLabel, index) => (
                      <div key={index}>
                        <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">{fieldLabel}</label>
                        <input
                          type="text"
                          placeholder={index === 0 ? method.placeholder : method.placeholder2 || method.placeholder}
                          value={formData[`${method.id}_${index}`] || ""}
                          onChange={(e) => handleInputChange(`${method.id}_${index}`, e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "card" && (
          <div className="space-y-4">
            {cardPaymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border-2 rounded-xl transition-all ${
                  selectedCardPayment === method.id ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"
                }`}
              >
                {/* Payment Method Header */}
                <div onClick={() => toggleCardMethodExpansion(method.id as keyof ExpandedCardMethods)} className="p-3 sm:p-4 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      {/* Radio Button */}
                      <div className="relative mt-1 flex-shrink-0">
                        <input
                          type="radio"
                          name="cardPayment"
                          value={method.id}
                          checked={selectedCardPayment === method.id}
                          onChange={() => handlePaymentSelection(method.id, "card")}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-2 border-gray-300 focus:ring-green-500 focus:ring-2 focus:ring-offset-0"
                        />
                      </div>

                      {/* Icon and Content */}
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div
                          className={`flex-shrink-0 p-1.5 sm:p-2 rounded-lg border border-gray-100 ${method.iconBg}`}
                        >
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 ${method.iconColor}`}>{method.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{method.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{method.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Chevron Icon */}
                    <div className="text-gray-600 ml-2 sm:ml-4 flex-shrink-0">
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {expandedCardMethods[method.id as keyof ExpandedCardMethods] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Fields - Only show when expanded */}
                {expandedCardMethods[method.id as keyof ExpandedCardMethods] && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                    {method.fields.map((fieldLabel, index) => (
                      <div key={index}>
                        <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">{fieldLabel}</label>
                        <input
                          type="text"
                          placeholder={method.placeholders[index]}
                          value={formData[`${method.id}_${index}`] || ""}
                          onChange={(e) => handleInputChange(`${method.id}_${index}`, e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
        >
          <ArrowLeftIcon />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors font-medium order-1 sm:order-2"
        >
          Continue
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default PaymentDetails
