import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'


export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers: async () => {
        set({isUserLoading:true})
        try {
            const response = await axiosInstance.get('/messages/users')
            set({users:response.data})
        } catch (error) {
            toast.error('Failed to fetch users')
        } finally {
            set({isUserLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading:true})
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({messages:response.data})
        } catch (error) {
            toast.error('Failed to fetch messages')
        } finally {
            set({isMessagesLoading:false})
        }
    },  

    sendMessage: async (messageData)=>{
        const {selectedUser,messages}=get()
        try{
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch(error){
            toast.error(error.response.data.message);
        }
    },

    //optimise this one later
    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    }
}))