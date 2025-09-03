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

// const ApplicationTestEmail = (props: any) => { // remove any and put proper values, see email-verification.tsx
//   const { 
//     applicantName = "Jan",
//     applicantEmail = "jan.tabuada@nexa-lumen.com",
//     positionTitle = "Senior Frontend Developer",
//     companyName = "Nexa Lumen Technologies",
//     dueDate = "January 18, 2025",
//     testDuration = "75 minutes",
//     testUrl = "https://example.com/application-test",
//     recruiterName = "Sarah Johnson",
//     recruiterEmail = "sarah.johnson@nexa-lumen.com"
//   } = props;

//   return (
//     <Html lang="en" dir="ltr">
//       <Tailwind>
//         <Head />
//         <Preview>Complete your 4-part assessment for {positionTitle} at {companyName}</Preview>
//         <Body className="bg-gray-100 font-sans py-[40px]">
//           <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
//             {/* Header */}
//             <Section className="text-center mb-[32px]">
//               <Heading className="text-[26px] font-bold text-blue-600 m-0 mb-[8px]">
//                 🎯 Pending Assessment
//               </Heading>
//               <Text className="text-[16px] text-gray-600 m-0">
//                 Tests awaiting completion
//               </Text>
//             </Section>

//             {/* Main Content */}
//             <Section className="mb-[32px]">
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 Dear {applicantName},
//               </Text>
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
//                 You have pending tests from your recruiter at <strong>knowthyteam</strong> for the <strong>{positionTitle}</strong> position at <strong>{companyName}</strong>.
//               </Text>
//               <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
//                 Please complete all 4 assessments below by <strong>{dueDate}</strong>.
//               </Text>
//             </Section>

//             {/* Assessment Overview */}
//             <Section className="bg-blue-50 border-l-[4px] border-blue-400 p-[24px] rounded-r-[8px] mb-[32px]">
//               <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
//                 📋 Assessment Overview
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Position:</strong> {positionTitle}
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Company:</strong> {companyName}
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Total Tests:</strong> 4 assessments
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Estimated Duration:</strong> {testDuration} total
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 <strong>Deadline:</strong> {dueDate}
//               </Text>
//             </Section>

//             {/* Action Button */}
//             <Section className="text-center mb-[32px]">
//               <Button
//                 href={testUrl}
//                 className="bg-blue-600 text-white px-[40px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
//               >
//                 Start Assessment Suite
//               </Button>
//             </Section>

//             <Hr className="border-gray-200 my-[32px]" />

//             {/* Test Breakdown */}
//             <Section className="mb-[32px]">
//               <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
//                 📝 Assessment Breakdown
//               </Heading>
              
//               {/* Big Five Test */}
//               <Section className="bg-purple-50 p-[16px] rounded-[8px] mb-[16px]">
//                 <Text className="text-[14px] font-semibold text-gray-900 leading-[20px] m-0 mb-[4px]">
//                   1. Big Five Personality Test (~20 minutes)
//                 </Text>
//                 <Text className="text-[13px] text-gray-700 leading-[18px] m-0">
//                   Evaluates your personality traits across five key dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism to understand your work style and team fit.
//                 </Text>
//               </Section>

//               {/* Typing Speed Test */}
//               <Section className="bg-green-50 p-[16px] rounded-[8px] mb-[16px]">
//                 <Text className="text-[14px] font-semibold text-gray-900 leading-[20px] m-0 mb-[4px]">
//                   2. Typing Speed Test (~10 minutes)
//                 </Text>
//                 <Text className="text-[13px] text-gray-700 leading-[18px] m-0">
//                   Measures your typing speed and accuracy, essential for productivity in this role. Youll type various text passages to determine your words per minute (WPM) and error rate.
//                 </Text>
//               </Section>

//               {/* Work Archetype Test */}
//               <Section className="bg-orange-50 p-[16px] rounded-[8px] mb-[16px]">
//                 <Text className="text-[14px] font-semibold text-gray-900 leading-[20px] m-0 mb-[4px]">
//                   3. Work Archetype Test (~15 minutes)
//                 </Text>
//                 <Text className="text-[13px] text-gray-700 leading-[18px] m-0">
//                   Identifies your preferred work style, collaboration approach, and professional strengths to ensure alignment with our team dynamics and company culture.
//                 </Text>
//               </Section>

//               {/* Custom Test */}
//               <Section className="bg-blue-50 p-[16px] rounded-[8px]">
//                 <Text className="text-[14px] font-semibold text-gray-900 leading-[20px] m-0 mb-[4px]">
//                   4. Role-Specific Assessment (~30 minutes)
//                 </Text>
//                 <Text className="text-[13px] text-gray-700 leading-[18px] m-0">
//                   Custom evaluation designed by our team to assess your technical skills, problem-solving abilities, and knowledge relevant to the {positionTitle} position.
//                 </Text>
//               </Section>
//             </Section>

//             {/* Preparation Tips */}
//             <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
//               <Heading className="text-[16px] font-semibold text-gray-900 m-0 mb-[12px]">
//                 💡 Preparation Tips
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • <strong>Environment:</strong> Find a quiet, distraction-free space with stable internet
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • <strong>Time:</strong> Block out the full duration - tests must be completed in one session
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • <strong>Honesty:</strong> Answer all questions truthfully for the best role match
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 • <strong>Typing Test:</strong> Warm up your fingers with some practice typing beforehand
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 • <strong>Technical Review:</strong> Review the job description and your relevant experience
//               </Text>
//             </Section>

//             {/* Important Notes */}
//             <Section className="bg-yellow-50 border border-yellow-200 p-[16px] rounded-[8px] mb-[32px]">
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>⚠️ Important Guidelines:</strong>
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 • Complete all 4 tests in the order presented
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 • Each test must be finished once started - no pausing or resuming
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 • You have one attempt per test - make it count
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
//                 • Contact us immediately if you experience technical issues
//               </Text>
//             </Section>

//             {/* Next Steps */}
//             <Section className="mb-[32px]">
//               <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
//                 🚀 What Happens Next?
//               </Heading>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 1. Complete all 4 assessments by <strong>{dueDate}</strong>
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 2. Our team analyzes your results within 3-5 business days
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 3. Qualified candidates advance to the interview stage
//               </Text>
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
//                 4. Well keep you informed throughout the entire process
//               </Text>
//             </Section>

//             {/* Contact Information */}
//             <Section className="text-center mb-[32px]">
//               <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
//                 <strong>Questions about the assessments?</strong>
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
//                 Contact your recruiter: <strong>{recruiterName}</strong>
//               </Text>
//               <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
//                 Email: <strong>{recruiterEmail}</strong>
//               </Text>
//             </Section>

//             {/* Footer */}
//             <Section className="border-t border-gray-200 pt-[24px]">
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
//                 This assessment notification was sent to {applicantEmail}
//               </Text>
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
//                 © 2025 knowthyteam. All rights reserved.
//               </Text>
//               <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
//                 Were committed to equal opportunity employment and fair assessment practices.
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// ApplicationTestEmail.PreviewProps = {
//   applicantName: "Jan",
//   applicantEmail: "jan.tabuada@nexa-lumen.com",
//   positionTitle: "Senior Frontend Developer",
//   companyName: "Nexa Lumen Technologies",
//   dueDate: "January 18, 2025",
//   testDuration: "75 minutes",
//   testUrl: "https://example.com/application-test",
//   recruiterName: "Sarah Johnson",
//   recruiterEmail: "sarah.johnson@nexa-lumen.com"
// };

// export default ApplicationTestEmail;