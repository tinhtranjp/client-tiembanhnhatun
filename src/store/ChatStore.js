import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export const useChatStore = create(
  immer((set) => ({
    activeTopic: null,
    activeUser: null,
    messages: null,
    users: null,
    topics: null,
    hasNewMessage: false,
    unreadCount: 0,
    setActiveUser: (userId) =>
      set((state) => {
        state.activeUser = state.users.find((user) => user.userId === userId)
      }),
    setActiveTopic: (topicId) =>
      set((state) => {
        state.activeTopic = state.topics.find((topic) => topic.id === topicId)
      }),
    setTopics: (newTopics) =>
      set((state) => {
        state.topics = newTopics
      }),
    markAsRead: (topicId) =>
      set((state) => {
        const topic = state.topics?.find((t) => t.id === topicId)
        if (!topic) return

        const unread = topic.unreadCount || 0
        state.unreadCount -= unread

        // reset topic
        topic.unreadCount = 0

        // reset activeTopic nếu cần
        if (state.activeTopic?.id === topicId) {
          state.activeTopic.unreadCount = 0
        }

        // trừ vào user
        const user = state.users?.find((u) => u.userId === topic.createdBy)
        if (user) {
          user.unreadCount = Math.max(0, user.unreadCount - unread)
        }
      }),
    addUnredCountUser: (userId) =>
      set((state) => {
        const user = state.users?.find((u) => u.userId === userId)
        if (user) {
          user.unreadCount = (user.unreadCount || 0) + 1
        }
      }),
    addUnredCountTopic: (topicId) =>
      set((state) => {
        const topic = state.topics?.find((t) => t.id === topicId)
        if (topic) {
          topic.unreadCount = (topic.unreadCount || 0) + 1
        }
      }),
    setMessages: (newMessages) =>
      set((state) => {
        state.messages = newMessages
      }),
    addMessage: (newMessage) =>
      set((state) => {
        if (!state.messages) {
          state.messages = []
        }
        state.messages.push(newMessage)
      }),
    triggerNewMessage: (topicId) => {
      set((state) => {
        if (state.activeTopic?.id === topicId) {
          state.hasNewMessage = true
        }
      })
      setTimeout(() => {
        set((state) => {
          state.hasNewMessage = false
        })
      }, 3000)
    },
    setTotalUnreadCount: (total) =>
      set(() => ({
        unreadCount: total,
      })),

    increaseUnreadCount: (delta = 1) =>
      set((state) => ({
        unreadCount: state.unreadCount + delta,
      })),
    removeUnreadCount: (delta) =>
      set((state) => ({
        unreadCount: state.unreadCount - delta,
      })),
    setUsers: (newUsers) =>
      set((state) => {
        state.users = newUsers
      }),
    clearUsers: () =>
      set((state) => {
        state.users = null
      }),
  })),
  {
    name: "chat-storage",
  },
)

export const getUsers = () => useChatStore.getState().users
export const setUsers = (users) => useChatStore.getState().setUsers(users)
export const setActiveTopic = (topicId) => useChatStore.getState().setActiveTopic(topicId)
export const setActiveUser = (userId) => useChatStore.getState().setActiveUser(userId)
export const setTopics = (topics) => useChatStore.getState().setTopics(topics)
export const clearUsers = () => useChatStore.getState().clearUsers()
export const getChats = () => useChatStore.getState().chats
