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
// } from '@react-email/components';

// const EmailVerificationEmail = (props: any) => { // remove any and put proper values, see email-verification.tsx
//   const { userName = "Jan", userEmail = "jan.tabuada@nexa-lumen.com", verificationUrl = "https://example.com/verify-email" } = props;

//   return (
//     <Html lang="en" dir="ltr">
//       <Tailwind>
//         <Head />
//         <Preview>Welcome! Please verify your email address</Preview>
//         <Body className="bg-gray-100 font-sans py-[40px]">
//           <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
//             {/* Header */}
//             <Section className="text-center mb-[32px]">
//               <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
//                 Welcome to Our Platform! 🎉
//               </Heading>
//               <Text className="text-[16px] text-gray-600 m-0">
//                 Just one more step to get started
//               </Text>
//             </Section>

//             {/* Main Content */}
//             <Section className="mb-[32px]">
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 Hi {userName},
//               </Text>
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 Thank you for signing up! Were excited to have you on board.
//               </Text>
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
//                 To complete your registration and start using your account, please verify your email address by clicking the button below:
//               </Text>
//             </Section>

//             {/* Verification Button */}
//             <Section className="text-center mb-[32px]">
//               <Button
//                 href={verificationUrl}
//                 className="bg-green-600 text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
//               >
//                 Verify My Email Address
//               </Button>
//             </Section>

//             {/* Alternative Link */}
//             <Section className="mb-[32px]">
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
//                 If the button above doesnt work, you can copy and paste this link into your browser:
//               </Text>
//               <Text className="text-[14px] text-blue-600 break-all m-0">
//                 {verificationUrl}
//               </Text>
//             </Section>

//             {/* Whats Next */}
//             <Section className="bg-blue-50 p-[20px] rounded-[8px] mb-[32px]">
//               <Text className="text-[16px] text-gray-800 font-semibold leading-[20px] m-0 mb-[12px]">
//                 Whats next?
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • Complete your profile setup
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • Explore our features and tools
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 • Join our community and start connecting
//               </Text>
//             </Section>

//             {/* Important Notice */}
//             <Section className="bg-yellow-50 border-l-[4px] border-yellow-400 p-[16px] mb-[32px]">
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Important:</strong> This verification link will expire in 48 hours.
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
//                 If you didnt create an account with us, please ignore this email or contact our support team.
//               </Text>
//             </Section>

//             {/* Support Section */}
//             <Section className="text-center mb-[32px]">
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 Need help? Were here for you!
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
//                 Contact us at <strong>support@company.com</strong> or visit our help center.
//               </Text>
//             </Section>

//             {/* Footer */}
//             <Section className="border-t border-gray-200 pt-[24px]">
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
//                 This email was sent to {userEmail}
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

// EmailVerificationEmail.PreviewProps = {
//   userName: "Jan",
//   userEmail: "jan.tabuada@nexa-lumen.com",
//   verificationUrl: "https://example.com/verify-email?token=abc123xyz789",
// };

// export default EmailVerificationEmail;