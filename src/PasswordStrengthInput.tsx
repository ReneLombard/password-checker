import React, { useState } from "react";
import zxcvbn from "zxcvbn";

const strengthLabels = ["Too Weak", "Weak", "Fair", "Good", "Strong"];

const getStrengthColor = (score: number) => {
    const gradients = [
        "bg-gradient-to-r from-red-500 to-red-700",
        "bg-gradient-to-r from-orange-400 to-orange-600",
        "bg-gradient-to-r from-yellow-400 to-yellow-600",
        "bg-gradient-to-r from-blue-400 to-blue-600",
        "bg-gradient-to-r from-green-500 to-green-700",
    ];
    return gradients[score] || "bg-gray-200";
};

const PasswordStrengthInput: React.FC = () => {
  const [password, setPassword] = useState("");
  const strength = zxcvbn(password);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-3">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter a strong password"
      />

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${getStrengthColor(strength.score)}`}
          style={{ width: `${(strength.score + 1) * 20}%` }}
        ></div>
      </div>

      {/* Strength Label */}
      <p className="text-sm font-medium text-gray-600">
        Strength: <span className="font-bold">{strengthLabels[strength.score]}</span>
      </p>

      {/* Suggestions */}
      {strength.feedback.suggestions.length > 0 && (
        <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
          {strength.feedback.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthInput;
