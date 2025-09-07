import { Letter } from "@/types";
import { useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import Button from "../ui/Button";
import OpenAI from "openai";

type CreateLetterProps = {
  apiKey: string | null;
  letter: Letter;
  setLetter: React.Dispatch<React.SetStateAction<Letter>>;
  website: string;
};

type AIResponse = {
  manager?: string;
  company?: string;
  position?: string;
  salutation?: string;
  body?: string[];
  closingText?: string;
};
const CreateLetter = ({
  apiKey,
  letter,
  setLetter,
  website,
}: CreateLetterProps) => {
  const [manager, setManager] = useState(letter.manager);
  const [company, setCompany] = useState(letter.company);
  const [companyAddress, setCompanyAddress] = useState(letter.companyAddress);
  const [companyCity, setCompanyCity] = useState(letter.companyCity);
  const [companyState, setCompanyState] = useState(letter.companyState);
  const [companyZip, setCompanyZip] = useState(letter.companyZip);
  const [position, setPosition] = useState(letter.position);
  const [salutation, setSalutation] = useState(letter.salutation);
  const [body, setBody] = useState(
    letter.body?.map((line) => line.trim()).join("\n") ?? ""
  );

  const [closingText, setClosingText] = useState(letter.closingText);


const handleGenerateLetter = async () => {
  if (!apiKey || apiKey.length <= 10) return;

  try {
    const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    const prompt = `
You are a professional career coach. 
Generate a concise, professional cover letter tailored for a job application. 
Use the following info if available:
Company Website: ${website || "N/A"}
Current Fields:
- Company: ${company || "Company Name"}
- Position: ${position || "Position Title"}
- Manager: ${manager || "Hiring Manager"}

Fill in all fields appropriately if missing.
Output JSON in the following format:
{
  "manager": "<name of hiring manager>",
  "company": "<company name>",
  "position": "<position name>",
  "salutation": "<e.g., Dear Hiring Manager,>",
  "body": ["<paragraph 1>", "<paragraph 2>", "<paragraph 3>"],
  "closingText": "<e.g., Sincerely, Your Name>"
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional career coach that writes highly effective cover letters tailored for job applications.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const aiText = completion.choices[0].message.content?.trim() || "";

    let parsed: AIResponse = {};
    try {
      parsed = JSON.parse(aiText) as AIResponse;
    } catch {
      console.warn("AI output not JSON, using generic fallback");
      parsed = {
        manager: manager || "Hiring Manager",
        company: company || "Company Name",
        position: position || "Position Title",
        salutation: "Dear Hiring Manager,",
        body: ["I am excited to apply for this position."],
        closingText: "Sincerely,\n[Your Name]",
      };
    }

    setManager(parsed.manager || manager);
    setCompany(parsed.company || company);
    setPosition(parsed.position || position);
    setSalutation(parsed.salutation || "Dear Hiring Manager,");
    setBody((parsed.body || ["I am excited to apply for this position."]).join("\n"));
    setClosingText(parsed.closingText || "Sincerely,\n[Your Name]");
  } catch (err) {
    console.error("Error generating cover letter:", err);
  }
};


  const handleSave = () => {
    setLetter({
      manager,
      company,
      companyAddress,
      companyCity,
      companyState,
      companyZip,
      position,
      salutation,
      body: body
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
      closingText,
    });
  };

  return (
    <div>
      <h5 className="font-semibold pb-3">Document</h5>
      <div className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <p> You need to input your website link to use this.</p>
          <Button
            variant={1}
            text="Generate Letter"
            onClick={handleGenerateLetter}
            disabled={!apiKey || apiKey.length <= 10 || website.trim() === ""}
            className="py-1 px-2"
          />
        </div>
        <ProfileInput
          label="Company Hiring Manager"
          value={manager}
          onChange={({ target }) => setManager(target.value)}
          edit={true}
          placeholder="Hiring Manager"
          variant="1"
        />
        <ProfileInput
          label="Company"
          value={company}
          onChange={({ target }) => setCompany(target.value)}
          edit={true}
          placeholder="Company"
          variant="1"
        />
        <ProfileInput
          label="Company Address"
          value={companyAddress}
          onChange={({ target }) => setCompanyAddress(target.value)}
          edit={true}
          placeholder="Company Address"
          variant="1"
        />
        <ProfileInput
          label="Company City"
          value={companyCity}
          onChange={({ target }) => setCompanyCity(target.value)}
          edit={true}
          placeholder="Company City"
          variant="1"
        />
        <ProfileInput
          label="Company State"
          value={companyState}
          onChange={({ target }) => setCompanyState(target.value)}
          edit={true}
          placeholder="Company State"
          variant="1"
        />
        <ProfileInput
          label="Company Zip"
          value={companyZip}
          onChange={({ target }) => setCompanyZip(target.value)}
          edit={true}
          placeholder="Company Zip"
          variant="1"
        />
        <ProfileInput
          label="Position"
          value={position}
          onChange={({ target }) => setPosition(target.value)}
          edit={true}
          placeholder="Position"
          variant="1"
        />
        <ProfileInput
          label="Salutation"
          value={salutation}
          onChange={({ target }) => setSalutation(target.value)}
          edit={true}
          placeholder="Salutation"
          variant="1"
        />
        <ProfileInput
          label="Closting Text"
          value={closingText}
          onChange={({ target }) => setClosingText(target.value)}
          edit={true}
          placeholder="Closing Text"
          variant="1"
        />
        <ProfileInput
          label="Body"
          value={body}
          onChange={({ target }) => setBody(target.value)}
          edit={true}
          placeholder="Body"
          variant="2"
        />

        <div className="flex justify-end">
          <Button
            text="Save Changes"
            variant={1}
            className="py-2 px-4"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLetter;
