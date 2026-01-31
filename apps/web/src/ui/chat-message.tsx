import React from 'react';

interface ChatMessageProps {
  sender: string;
  timestamp: string;
  title: string;
  message?: string;
  statusItems?: string[];
  isRead?: boolean;
  readTime?: string;
}

export function ChatMessage({
  sender,
  timestamp,
  title,
  message,
  statusItems = [],
  isRead = false,
  readTime
}: ChatMessageProps) {
  return (
    <div className="flex gap-3 p-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-600 text-sm">{sender}</span>
          <span className="text-gray-400 text-xs">{timestamp}</span>
        </div>
        
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        
        {message && (
          <p className="text-sm mb-3" dangerouslySetInnerHTML={{ __html: message }} />
        )}
        
        {statusItems.length > 0 && (
          <div className="space-y-1 mb-2">
            {statusItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        )}
        
        {isRead && readTime && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>✓</span>
            <span>선생님 확인 완료 {readTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}