"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef } from "react";

interface InputAreaProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  onStop?: () => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
}

function InputArea({
  input,
  handleInputChange,
  handleSubmit,
  disabled,
  onStop,
  onRegenerate,
  isLoading
}: InputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 240)}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(e.target);
    handleInputChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && input.trim()) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex w-full items-stretch gap-2 rounded-t-xl bg-macchiato-surface0 px-3 py-3 sm:max-w-3xl">
        <div className="flex flex-grow flex-col">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={disabled}
            resizable={false}
            rows={1}
          />
        </div>
        <div className="flex items-end gap-2">
          {isLoading && onStop && (
            <button
              onClick={onStop}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
              type="button"
            >
              Stop
            </button>
          )}
          {!isLoading && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
              type="button"
            >
              Regenerate
            </button>
          )}
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(InputArea);
