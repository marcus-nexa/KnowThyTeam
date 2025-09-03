// import * as React from 'react';
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Preview,
//   Section,
//   Text,
//   Tailwind,
//   Hr,
// } from '@react-email/components';

// const BillingAlertEmail = (props: any) => { // remove any and put proper values, see email-verification.tsx
//   const { 
//     userName = "Jan",
//     userEmail = "jan.tabuada@nexa-lumen.com",
//     planName = "Pro Plan",
//     amount = "$29.99",
//     dueDate = "January 15, 2025",
//     invoiceNumber = "INV-2025-001",
//     updatePaymentUrl = "https://example.com/billing/payment-method",
//     viewInvoiceUrl = "https://example.com/billing/invoice/INV-2025-001"
//   } = props;

//   return (
//     <Html lang="en" dir="ltr">
//       <Tailwind>
//         <Head />
//         <Preview>Payment Required - Action needed for your account</Preview>
//         <Body className="bg-gray-100 font-sans py-[40px]">
//           <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
//             {/* Header */}
//             <Section className="text-center mb-[32px]">
//               <Heading className="text-[24px] font-bold text-red-600 m-0 mb-[8px]">
//                 Payment Required
//               </Heading>
//               <Text className="text-[16px] text-gray-600 m-0">
//                 Your payment was unsuccessful
//               </Text>
//             </Section>

//             {/* Main Content */}
//             <Section className="mb-[32px]">
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 Hi {userName},
//               </Text>
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 We were unable to process your payment for your <strong>{planName}</strong> subscription. Your account will be suspended if payment is not received by <strong>{dueDate}</strong>.
//               </Text>
//             </Section>

//             {/* Billing Details */}
//             <Section className="bg-gray-50 p-[24px] rounded-[8px] mb-[32px]">
//               <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
//                 Billing Details
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Plan:</strong> {planName}
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Amount Due:</strong> {amount}
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Due Date:</strong> {dueDate}
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 <strong>Invoice Number:</strong> {invoiceNumber}
//               </Text>
//             </Section>

//             {/* Action Buttons */}
//             <Section className="text-center mb-[32px]">
//               <Button
//                 href={updatePaymentUrl}
//                 className="bg-red-600 text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block mb-[12px]"
//               >
//                 Update Payment Method
//               </Button>
//               <br />
//               <Button
//                 href={viewInvoiceUrl}
//                 className="bg-gray-600 text-white px-[32px] py-[12px] rounded-[8px] text-[14px] font-medium no-underline box-border inline-block"
//               >
//                 View Invoice
//               </Button>
//             </Section>

//             <Hr className="border-gray-200 my-[32px]" />

//             {/* What Happens Next */}
//             <Section className="mb-[32px]">
//               <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
//                 What happens next?
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[12px]">
//                 <strong>• Today:</strong> Update your payment method to avoid service interruption
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[12px]">
//                 <strong>• {dueDate}:</strong> Account will be suspended if payment is not received
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 <strong>• After 7 days:</strong> Account may be permanently closed and data deleted
//               </Text>
//             </Section>

//             {/* Common Issues */}
//             <Section className="bg-blue-50 p-[20px] rounded-[8px] mb-[32px]">
//               <Heading className="text-[16px] font-semibold text-gray-900 m-0 mb-[12px]">
//                 Common Payment Issues
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • Expired or invalid credit card
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • Insufficient funds in account
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • Card blocked by your bank
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 • Billing address mismatch
//               </Text>
//             </Section>

//             {/* Support Section */}
//             <Section className="text-center mb-[32px]">
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Need help with your payment?</strong>
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 Our billing support team is here to assist you.
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
//                 Email: <strong>billing@company.com</strong> | Phone: <strong>(555) 123-4567</strong>
//               </Text>
//             </Section>

//             {/* Footer */}
//             <Section className="border-t border-gray-200 pt-[24px]">
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
//                 This billing notice was sent to {userEmail}
//               </Text>
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
//                 © 2025 Your Company Name. All rights reserved.
//               </Text>
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
//                 123 Business Street, Suite 100, City, State 12345
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// BillingAlertEmail.PreviewProps = {
//   userName: "Jan",
//   userEmail: "jan.tabuada@nexa-lumen.com",
//   planName: "Pro Plan",
//   amount: "$29.99",
//   dueDate: "January 15, 2025",
//   invoiceNumber: "INV-2025-001",
//   updatePaymentUrl: "https://example.com/billing/payment-method",
//   viewInvoiceUrl: "https://example.com/billing/invoice/INV-2025-001"
// };

// export default BillingAlertEmail;