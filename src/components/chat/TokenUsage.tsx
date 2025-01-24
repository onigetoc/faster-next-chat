"use client";
import React from "react";

interface TokenUsageProps {
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

function TokenUsage({ usage }: TokenUsageProps) {
  if (!usage) return null;

  return (
    <div className="flex items-center gap-4 text-sm text-white-500">
      {usage.prompt_tokens !== undefined && (
        <span>Prompt tokens: {usage.prompt_tokens}</span>
      )}
      {usage.completion_tokens !== undefined && (
        <span>Completion tokens: {usage.completion_tokens}</span>
      )}
      {usage.total_tokens !== undefined && (
        <span>Total tokens: {usage.total_tokens}</span>
      )}
    </div>
  );
}

export default React.memo(TokenUsage); 