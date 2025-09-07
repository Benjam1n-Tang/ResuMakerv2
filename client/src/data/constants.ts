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
    resumeName: "Default Resume",
    header: {
      name: "Full Name",
      city: "City",
      state: "State",
      zip: "Zip",
      phone: "Phone",
      email: "john.doe@email.com",
    },
    education: [
      {
        school: "Generic University",
        degree: "Master of XXXXXXX",
        gradDate: "Expected May 20XX",
        location: "City, State",
        gpa: 4.00,
        active: true,
        coursework: [
          "Course 1",
          "Course 2", "Course 3"
        ],
      },
      {
        school: "Generic University",
        degree: "Bachelor of XXXXXXX",
        gradDate: "Expected May 20XX",
        location: "City, State",
        gpa: 4.00,
        active: true,
        coursework: [
          "Course 1",
          "Course 2", "Course 3"
        ],
      },
    ],
    experience: [
      {
        role: "Experience Role 1",
        company: "Generic Company 1",
        location: "City, State",
        startDate: "Oct 20XX",
        active: true,
        endDate: "Present",
        bullets: [
          "Bullet 1", "Bullet 2", "Bullet 3"
        ],
      },
      {
        role: "Experience Role 2",
        company: "Generic Company 2",
        location: "City, State",
        startDate: "Oct 20XX",
        active: true,
        endDate: "Jan 20XX",
        bullets: [
          "Bullet 1", "Bullet 2", "Bullet 3"
        ],
      },
      {
        role: "Experience Role 3",
        company: "Generic Company 3",
        location: "City, State",
        startDate: "Oct 20XX",
        active: true,
        endDate: "Jan 20XX",
        bullets: [
          "Bullet 1", "Bullet 2", "Bullet 3"
        ],
      },
      {
        role: "Experience Role 4",
        company: "Generic Company 4",
        location: "City, State",
        startDate: "Oct 20XX",
        active: true,
        endDate: "Jan 20XX",
        bullets: [
          "Bullet 1", "Bullet 2", "Bullet 3"
        ],
      },
    ],
    projects: [
      {
        active: true, 
        title: "Project 1",
        stack: ["Item 1", "Item 2", "Item 3"],
        link: "Link",
        bullets: [
          "Bullet 1", "Bullet 2"
        ],
      },
      {
        active: true, 
        title: "Project 2",
        stack: ["Item 1", "Item 2", "Item 3"],
        link: "Link",
        bullets: [
          "Bullet 1", "Bullet 2"
        ],
      },
      {
        active: true, 
        title: "Project 3",
        stack: ["Item 1", "Item 2", "Item 3"],
        link: "Link",
        bullets: [
          "Bullet 1", "Bullet 2"
        ],
      },
      {
        active: true, 
        title: "Project 4",
        stack: ["Item 1", "Item 2", "Item 3"],
        link: "Link",
        bullets: [
          "Bullet 1", "Bullet 2"
        ],
      },
    ],
    skills: {
      languages: ["Language 1", "Language 2"],
      other: [
        "Other 1", "Other 2", "Other 3"
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
