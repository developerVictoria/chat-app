
import MessageInput from './MessageInput'
import Messages from './Messages'
import NoChatSelected from './NoChatSelected';


const MessageContainer = () => {
    const NoChatSelect = true;



    return (
        <div className='md:min-w-[450px] flex-col'>
            {NoChatSelect ?
                (<NoChatSelected />) :
                (
                    <>
                        {/* Header */}
                        <div className='bg-indigo-400 px-4 py-2 mb-2'>
                            <span className='label-text text-gray-700'>To: </span>
                            <span className=' text-gray-900 font-bold'>
                                John Doe
                            </span>
                        </div>
                        <Messages />
                        <MessageInput />
                    </>
                )

            }

        </div>
    )
}


export default MessageContainer
