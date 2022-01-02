import { useNavigate } from "react-router-dom";
import {
  LoadingIndicator,
  Chat,
  ChannelList,
  Channel,
  Window,
  MessageInput,
  MessageList,
  ChannelHeader,
} from "stream-chat-react";
import { ChannelListMessengerProps, CustomStyles } from "stream-chat-react/dist/components";
import { useChatContext } from "stream-chat-react/dist/context";
import { Button } from "../components/Button";
import { useLoggedInAuth } from "../context/AuthContext";

export function Home() {
  const { user, streamChat } = useLoggedInAuth();

  if (streamChat == null) return <LoadingIndicator />;

  const darkModeTheme: CustomStyles = {
    "--bg-gradient-end": "#101214",
    "--bg-gradient-start": "#070a0d",
    "--black": "#ffffff",
    "--blue-alice": "#00193d",
    "--border": "#141924",
    "--button-background": "#ffffff",
    "--button-text": "#005fff",
    "--grey": "#7a7a7a",
    "--grey-gainsboro": "#2d2f2f",
    "--grey-whisper": "#1c1e22",
    "--modal-shadow": "#000000",
    "--overlay": "#00000066",
    "--overlay-dark": "#ffffffcc",
    "--shadow-icon": "#00000080",
    "--targetedMessageBackground": "#302d22",
    "--transparent": "transparent",
    "--white": "#101418",
    "--white-smoke": "#13151b",
    "--white-snow": "#070a0d",
  };

  return (
    <Chat client={streamChat} customStyles={darkModeTheme}>
      <ChannelList List={Channels} sendChannelsToList filters={{ members: { $in: [user.id] } }} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
  const navigate = useNavigate();
  const { logout } = useLoggedInAuth();
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-yellow-300 text-black"
              : "hover:bg-yellow-200 hover:text-black bg-gray-500";
            return (
              <button
                onClick={() => setActiveChannel(channel)}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img src={channel.data.image} className="w-10 h-10 rounded-full object-center object-cover" />
                )}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No Conversations"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Logout
      </Button>
    </div>
  );
}
