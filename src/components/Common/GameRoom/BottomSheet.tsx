import * as StompJS from '@stomp/stompjs';
import { MessagesSquare } from 'lucide-react';

import {
  Button,
  Chatting,
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components';
import { ChatMessage } from '@/types';

interface BottomSheetProps {
  myName: string;
  chatMessages: ChatMessage[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}
const BottomSheet = ({
  myName,
  chatMessages,
  sendMessage,
}: BottomSheetProps) => {
  return (
    <Drawer>
      <div className="absolute bottom-4 right-4 z-40">
        <DrawerTrigger asChild>
          <Button size={'icon'}>
            <MessagesSquare />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className="bg-container w-full py-2 pt-4 h-[40vh]">
          <Chatting
            myName={myName}
            chatMessages={chatMessages}
            sendMessage={sendMessage}
            isMobile={true}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
