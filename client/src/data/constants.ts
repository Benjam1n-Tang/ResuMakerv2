import * as Icon from "@/assets/icons";

export const navLinks = [
  { href: "create", label: "Create" },
  { href: "resumes", label: "Resumes" },
  { href: "letters", label: "Cover Letters" },
];

export const socials = [
  {
    name: "LinkedIn",
    icon: Icon.linkedin,
    href: "https://www.linkedin.com/in/btang22/",
  },
  {
    name: "Github",
    icon: Icon.github,
    href: "https://github.com/Benjam1n-Tang",
  },
  {
    name: "Instagram",
    icon: Icon.instagram,
    href: "https://www.instagram.com/benjamintang22/",
  },
  {
    name: "Twitter",
    icon: Icon.twitter,
    href: "https://x.com/BenjaminTa1493",
  },
];

export const features = [
  {
    title: "Personalized Secure Profile",
    description:
      "Save your details, work history, and preferences under your account so your documents are always accessible and easy to update.",
  },
  {
    title: "AI-Powered Resume Builder",
    description:
      "Instantly generate professional resumes and tailored cover letters with AI assistance, or choose to craft them manually for full control.",
  },
  {
    title: "Simple Document Management",
    description:
      "Seamlessly switch between AI-generated drafts and your handwritten versions, with all your resume and cover letters stored in one piece.",
  },
];

export const sampleResumes = [
  {
    resumeName: "BigSib",
    header: {
      name: "Benjamin Tang",
      address: "76-44 169th Street",
      city: "New York",
      state: "NY",
      zip: "11366",
      phone: "(347) 520-7272",
      email: "benjamin.tang.work@gmail.com",
      socials: ["linkedin.com/in/BTang22", "github.com/Benam1n-Tang"],
      // summary: "Trend savvy Information science major with 2 years' experience in retail and consistent record of advancement to leadership positions. Passionate about creating compelling social media content that increases customer engagement and dries website traffic and sales. Data-driven with experience adapting to virtual business needs."
    },
    education: [
      {
        school: "Stony Brook University",
        degree: "Bachelor of Science in Computer Science",
        gradDate: "Expected May 2026",
        location: "Stony Brook, NY",
        gpa: 3.25,
        coursework: [
          "Fundamentals of Software Development",
          "Analysis of Algorithms",
          "Data Structures",
          "Principles of Database Systems",
          "Web Security",
          "System Fundamentals I & II",
          "Programming Abstractions",
        ],
      },
    ],
    experience: [
      {
        role: "Software Engineer Intern",
        company: "Selective Corporate Internship Program",
        location: "Remote (US)",
        startDate: "May 2023",
        endDate: "Aug 2023",
        bullets: [
          "Designed and contributed to five new webiste pages, resulting in increased visibility of the program to over 300 monthly visitors.",
          "Developed responsive front-end interfaces using Javascript, HTML, CSS, ensuring a user-friendly experience across all devices.",
          "Promoted the program on social media, growing the follower base to over 300 followers on Instagram.",
        ],
      },
      {
        role: "Co-Founder/Tutor",
        company: "BigSib Organization",
        location: "New York, NY",
        startDate: "Nov 2020",
        endDate: "May 2022",
        bullets: [
          "Co-founded a non-proft tutoring program to help young students aged 12 and below improve their academic performance in school.",
          "Arranged tutoring sessions with over 15 students to teach object-oriented programming and data structures in Python and Java.",
          "Developed personalized lesson plans and coding exercises, enabling students to build projects and strengthen problem-solving skills.",
        ],
      },
    ],
    projects: [
      {
        title: "Resumaker",
        stack: ["Typescript", "Next JS", "MongoDB", "Node JS", "Tailwind CSS"],
        link: "https://bit.ly/4g3gF1k",
        bullets: [
          "Integrated AI-driven text generation to assist users in writing tailored career summaries and cover letters.",
          "Implemented user authentication and secure data storage, allowing users to save, edit, and manage multiple application documents.",
        ],
      },
      {
        title: "Screen Recording App",
        stack: ["Next JS", "Xata", "Drizzle", "Tailwind CSS"],
        link: "https://bit.ly/3JsMVyH",
        bullets: [
          "Implemented video recording and storage functionality, enabling users to securely save and manage recordings in the cloud.",
          "Designed a responsive and intuitive UI with Tailwind CSS, ensuring accessibility across desktop and mobile devices.",
        ],
      },
      {
        title: "Chess A.I.",
        stack: ["Typescript", "React", "Tailwind CSS", "GitHub"],
        link: "https://bit.ly/3JsMVyH",
        bullets: [
          "Applied the min-max algorithm to the game of chess, developing a game of chess with the option to play locally or with a bot that can evaluate the board to make its own movement",
          "Developed a React TypeScript application that follows the rules of chess and includes a custom UI fr all pages.",
        ],
      },
      {
        title: "Face Recognition Attendance",
        stack: ["Python", "OpenCV"],
        link: "https://bit.ly/4mOYkHG",
        bullets: [
          "Developed a facial recognition tracking system for online meetings using Python, implemented facial encoding techniques to accurately identify participants.",
          "Tested and utilized during online courses to high degree of precision.",
        ],
      },
    ],
    skills: {
      languages: ["Python", "Java", "C", "C++", "Javascript"],
      other: [
        "HTML",
        "CSS",
        "React",
        "Typescript",
        "Next JS",
        "Node JS",
        "Flask",
        "SQL",
        "MongoDB",
        "Git",
        "Microsoft Excel",
        "Figma",
        "G Suite",
        "Teamwork",
        "Adaptability",
        "Time Management",
        "Customer Service",
      ],
    },
    letter: {
      company: "Stony Brook University",
      companyAddress: "4 Irving PI",
      companyCity: "Stony Brook",
      companyState: "NY",
      companyZip: "11794",
      position: "Web Development Fellow",
      body: [
        "I am writing to express my interest in the Web Development Fellow position with the Marketing and Communications (MARCOM) Office at Stony Brook University. As a Computer Science student with hands-on experience in full-stack development and web technologies, I am eager to apply my skills in a collaborative, fast-paced, and creative environment while contributing to the university’s digital presence.",

        "Through my academic and project-based experiences, I have built a strong foundation in HTML, CSS, JavaScript, and database-driven applications, complemented by exposure to frameworks such as Next.js and Node.js. I am particularly drawn to this fellowship because it combines technical web development with storytelling and brand communication, aligning with my passion for both coding and creative problem-solving.",

        "These experiences taught me the importance of adaptability, clear communication, and working collaboratively across diverse teams—qualities I know are essential to thriving in the MARCOM ecosystem. I am confident that my background in software development, combined with my enthusiasm for continuous learning, will allow me to make a meaningful contribution to the Digital and Social Media Services unit.",

        "I am excited about the opportunity to join Stony Brook University’s MARCOM Fellows Program and contribute to projects that capture the spirit of the university community. Thank you for considering my application. I look forward to the possibility of discussing how my technical skills and creativity can support MARCOM’s mission.",
      ],
    },
  },
];
