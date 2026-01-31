import React from 'react';

interface ChatMessageProps {
  avatar?: string;
  sender: string;
  timestamp: string;
  message: string;
  isDelivered?: boolean;
  isRead?: boolean;
  readTime?: string;
}

export function ChatMessage({
  avatar,
  sender,
  timestamp,
  message,
  isDelivered = false,
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
        
        <div className="mb-2">
          <h3 className="text-lg font-medium mb-1">
            안전히 귀가했어요 🏠
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            충전이 완료되었어요! 오늘 컨디션 최고!
          </p>
          <p className="text-sm">
            "전반적으로 컨디션이 좋지 않아 보였지 때문에{' '}
            <span className="text-red-500">주의가 필요합니다.</span>"
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-gray-600 text-sm">청열거리는 행동을 보였어요</span>
        </div>
        
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