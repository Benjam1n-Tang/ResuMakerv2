"use client";

import { useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import Button from "../ui/Button";

const PasswordProfile = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("key") || "");
  const [tempKey, setTempKey] = useState(apiKey);
  const [error, setError] = useState<string | null>(null);

  const isValidKey = (key: string) => {
  const trimmed = key.trim();
  return trimmed.startsWith("sk-") && trimmed.length > 30;
};

  const handleSave = () => {
    if (isValidKey(tempKey)) {
      localStorage.setItem("key", tempKey.trim());
      setApiKey(tempKey.trim());
      setError(null);
    } else {
      setError("Invalid API key format. It should start with sk-");
    }
  };

  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">Passwords & Keys</h4>
          <h6>Update your password and keys</h6>
        </div>

        <div className="px-0 md:px-10 flex flex-col gap-1">
          <ProfileInput
            type="password" 
            value={tempKey}
            onChange={({ target }) => setTempKey(target.value)}
            label="OpenAI API Key"
            placeholder="sk-xxxxxxxxxxxxxxxx"
            variant="1"
            edit={true}
          />

          {error && <p className="text-sm text-error">{error}</p>}

          <Button
            text="Save Key"
            variant={1}
            className="px-4 py-1"
            onClick={handleSave}
          />

          {apiKey && (
            <p className="text-xs text-gray-500">
              ✅ Key saved locally (hidden for security)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordProfile;
